// Example Node.js/Express backend API for MS SQL Server integration
// This file shows how to set up the backend API that the booking form will call

// npm install express mssql cors dotenv express-validator

const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MS SQL Server configuration
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER.split(',')[0], // Extract server name
  port: parseInt(process.env.DB_SERVER.split(',')[1]) || 1433, // Extract port
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, // Use this for Azure/remote connections
    enableArithAbort: true,
    trustServerCertificate: true, // Add this for self-signed certificates
  },
  connectionTimeout: 30000, // 30 seconds
  requestTimeout: 30000, // 30 seconds
};

// Connect to database
sql.connect(config)
  .then(() => console.log('Connected to MS SQL Server'))
  .catch(err => console.error('Database connection failed:', err));

// Validation middleware
const validateBooking = [
  body('fullName').trim().isLength({ min: 1 }).withMessage('Full name is required'),
  body('contactNumber').matches(/^\+?[\d\s\-\(\)]{10,15}$/).withMessage('Invalid contact number'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('service').trim().isLength({ min: 1 }).withMessage('Service is required'),
  body('date').isISO8601().withMessage('Invalid date format'),
  body('time').matches(/^\d{2}:\d{2}$/).withMessage('Invalid time format'),
];

// API Routes

// Create a new booking
app.post('/api/bookings', validateBooking, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    const { fullName, contactNumber, email, service, date, time } = req.body;

    // Check for duplicate booking (same date, time)
    const checkQuery = `
      SELECT COUNT(*) as count 
      FROM Bookings 
      WHERE Date = @date AND Time = @time
    `;

    const checkRequest = new sql.Request();
    checkRequest.input('date', sql.Date, date);
    checkRequest.input('time', sql.NVarChar(10), time);
    
    const checkResult = await checkRequest.query(checkQuery);
    
    if (checkResult.recordset[0].count > 0) {
      return res.status(409).json({ 
        error: 'Time slot already booked' 
      });
    }

    // Insert new booking
    const insertQuery = `
      INSERT INTO Bookings (FullName, [contact number], email, Service, Date, Time)
      OUTPUT INSERTED.*
      VALUES (@fullName, @contactNumber, @email, @service, @date, @time)
    `;

    const request = new sql.Request();
    request.input('fullName', sql.NVarChar(100), fullName);
    request.input('contactNumber', sql.NVarChar(15), contactNumber);
    request.input('email', sql.NVarChar(50), email);
    request.input('service', sql.NVarChar(100), service);
    request.input('date', sql.Date, date);
    request.input('time', sql.NVarChar(10), time);

    const result = await request.query(insertQuery);
    
    res.status(201).json({
      message: 'Booking created successfully',
      booking: result.recordset[0]
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// Get all bookings (optional - for admin purposes)
app.get('/api/bookings', async (req, res) => {
  try {
    const query = 'SELECT * FROM Bookings ORDER BY Date, Time';
    const request = new sql.Request();
    const result = await request.query(query);
    
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// Check availability for a specific date and time
app.get('/api/bookings/availability', async (req, res) => {
  try {
    const { date, time } = req.query;
    
    if (!date || !time) {
      return res.status(400).json({ 
        error: 'Date and time are required' 
      });
    }

    const query = `
      SELECT COUNT(*) as count 
      FROM Bookings 
      WHERE Date = @date AND Time = @time
    `;

    const request = new sql.Request();
    request.input('date', sql.Date, date);
    request.input('time', sql.NVarChar(10), time);
    
    const result = await request.query(query);
    const isAvailable = result.recordset[0].count === 0;
    
    res.json({ available: isAvailable });
  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// Delete a booking (optional)
app.delete('/api/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = 'DELETE FROM Bookings WHERE Id = @id';
    const request = new sql.Request();
    request.input('id', sql.Int, id);
    
    const result = await request.query(query);
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ 
        error: 'Booking not found' 
      });
    }
    
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

app.listen(port, () => {
  console.log(`Booking API server running on port ${port}`);
});

// Export for testing purposes
module.exports = app;