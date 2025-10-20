# Pet Booking System Widget - Integration Guide

This pet booking system provides a React-based widget that can be easily integrated into any veterinary clinic or pet service website as a snippet. The widget includes a calendar form with validation and connects to MS SQL Server for data storage.

## Quick Integration

### Method 1: Simple HTML Integration (Recommended)

Add this to your HTML page where you want the booking widget to appear:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Website</title>
    <!-- Include the widget CSS -->
    <link rel="stylesheet" href="./dist/booking-widget.css">
</head>
<body>
    <!-- Your existing content -->
    
    <!-- Booking Widget Container -->
    <div id="booking-widget-auto"></div>
    
    <!-- Include the widget JavaScript -->
    <script src="./dist/booking-widget.js"></script>
</body>
</html>
```

### Method 2: Manual Initialization

If you want more control over when the widget loads:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Website</title>
    <link rel="stylesheet" href="./dist/booking-widget.css">
</head>
<body>
    <!-- Your existing content -->
    
    <!-- Custom container ID -->
    <div id="my-booking-form"></div>
    
    <script src="./dist/booking-widget.js"></script>
    <script>
        // Initialize the widget when ready
        document.addEventListener('DOMContentLoaded', function() {
            BookingWidget.init('my-booking-form', {
                apiUrl: 'https://your-api-domain.com/api' // Optional: custom API URL
            });
        });
    </script>
</body>
</html>
```

## Backend Setup

### 1. Database Setup

Create the required table in your MS SQL Server database:

```sql
CREATE TABLE Bookings (
  Id INT IDENTITY PRIMARY KEY,
  FullName NVARCHAR(100),
  [contact number] NVARCHAR(15),
  email NVARCHAR(50),
  Service NVARCHAR(100),
  Date DATE,
  Time NVARCHAR(10)
);
```

### 2. Backend API Setup

1. Copy the `server/app.js` file to your backend server
2. Install required dependencies:
   ```bash
   npm install express mssql cors dotenv express-validator
   ```

3. Create a `.env` file with your database configuration:
   ```env
   DB_USER=your_db_username
   DB_PASSWORD=your_db_password
   DB_SERVER=your_server_name
   DB_DATABASE=your_database_name
   PORT=3000
   ```

4. Start the backend server:
   ```bash
   node server/app.js
   ```

### 3. Frontend Configuration

Update the API URL in your environment:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

Then rebuild the widget:
```bash
npm run build
```

## Widget Features

### Form Fields
- **Full Name**: Text input with validation
- **Contact Number**: Phone number with format validation
- **Email**: Email address with validation
- **Service**: Dropdown selection from predefined pet services
- **Date**: Calendar date picker (only future dates allowed)
- **Time**: Time slot selection with availability checking

### Built-in Features
- ✅ Form validation with error messages
- ✅ Date picker with calendar interface
- ✅ Time slot availability checking
- ✅ Responsive design (mobile-friendly)
- ✅ Success/error notifications
- ✅ Duplicate booking prevention
- ✅ Accessibility support
- ✅ Pet-specific service options

## Customization

### Custom Pet Services

To modify the available pet services, edit `src/types/booking.ts`:

```typescript
export const SERVICES = [
  'Pet Grooming',
  'Veterinary Checkup', 
  'Pet Vaccination',
  'Pet Dental Care',
  'Your Custom Pet Service',
  // Add your pet services here
];
```

### Custom Time Slots

To modify available time slots, edit `src/types/booking.ts`:

```typescript
export const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30',
  // Add your time slots here
];
```

### Custom Styling

The widget uses CSS classes that you can override:

```css
/* Override widget container */
.booking-form-container {
    max-width: 600px; /* Custom width */
    /* Your custom styles */
}

/* Override form styling */
.booking-form {
    background: #f9f9f9; /* Custom background */
    /* Your custom styles */
}

/* Override button colors */
.submit-button {
    background-color: #your-brand-color;
}
```

## API Endpoints

The backend provides these endpoints:

- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - Get all bookings (admin)
- `GET /api/bookings/availability?date=YYYY-MM-DD&time=HH:MM` - Check availability
- `DELETE /api/bookings/:id` - Delete a booking (admin)

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## File Structure

```
dist/
├── booking-widget.js     # Main widget JavaScript
├── booking-widget.css    # Widget styles
└── index.html           # Demo page

src/
├── components/
│   ├── BookingForm.tsx   # Main form component
│   ├── BookingWidget.tsx # Widget wrapper
│   └── Notification.tsx  # Success/error messages
├── services/
│   └── bookingService.ts # API communication
├── types/
│   └── booking.ts        # TypeScript types
└── widget.tsx           # Widget entry point

server/
└── app.js               # Backend API server
```

## Deployment

1. Build the widget: `npm run build`
2. Upload `dist/booking-widget.js` and `dist/booking-widget.css` to your web server
3. Deploy the backend API to your server
4. Update the API URL in your environment and rebuild if necessary
5. Include the widget files in your website

## Troubleshooting

### Common Issues

1. **Widget not loading**: Check browser console for JavaScript errors
2. **API errors**: Verify backend server is running and database is accessible
3. **CORS errors**: Ensure your backend allows requests from your website domain
4. **Styling issues**: Check that CSS file is properly loaded

### Debug Mode

To enable debug logging, open browser console and run:
```javascript
localStorage.setItem('booking-debug', 'true');
```

## Support

For issues or customizations, check the source code in the `src/` directory. The widget is built with React and TypeScript for easy modification.