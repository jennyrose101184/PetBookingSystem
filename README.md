# Pet Booking System Widget

A modern, responsive pet booking system widget built with React and Vite. This widget can be easily integrated into any veterinary clinic or pet service website as a snippet and connects to MS SQL Server for data storage.

## Features

- 📅 **Calendar Integration** - Interactive date picker for pet appointment scheduling
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ✅ **Form Validation** - Client-side validation with user-friendly error messages
- 🔄 **Real-time Availability** - Checks pet appointment availability in real-time
- 🎨 **Customizable Styling** - Easy to customize colors and layout
- 🔒 **Data Security** - Secure API integration with MS SQL Server
- ♿ **Accessibility** - WCAG compliant for screen readers and keyboard navigation
- 🐕 **Pet Services** - Specialized for veterinary and pet care services

## Database Schema

The widget works with this MS SQL Server table structure:

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

## Quick Start

### Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

### Integration

See [INTEGRATION.md](./INTEGRATION.md) for detailed integration instructions.

**Quick HTML Integration:**

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="./dist/booking-widget.css">
</head>
<body>
    <div id="booking-widget-auto"></div>
    <script src="./dist/booking-widget.js"></script>
</body>
</html>
```

## Project Structure

```
src/
├── components/          # React components
│   ├── BookingForm.tsx     # Main booking form
│   ├── BookingWidget.tsx   # Widget wrapper
│   └── Notification.tsx    # Success/error messages
├── services/           # API services
│   └── bookingService.ts   # Booking API calls
├── types/              # TypeScript definitions
│   ├── booking.ts          # Booking data types
│   └── global.d.ts         # Global type declarations
├── App.tsx             # Demo application
├── main.tsx           # React entry point
└── widget.tsx         # Widget entry point

server/
└── app.js             # Express.js backend API

dist/                  # Built widget files
├── booking-widget.js     # Widget JavaScript
├── booking-widget.css    # Widget styles
└── index.html           # Demo page
```

## Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: CSS3 with custom properties
- **Date Picker**: React DatePicker
- **HTTP Client**: Axios
- **Backend**: Node.js, Express.js
- **Database**: MS SQL Server
- **Validation**: Express Validator

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

Create `.env` file for configuration:

```env
# Frontend API URL
VITE_API_URL=http://localhost:3000/api

# Backend Database Config
DB_USER=your_username
DB_PASSWORD=your_password
DB_SERVER=your_server
DB_DATABASE=your_database
PORT=3000
```

## Customization

### Services
Edit `src/types/booking.ts` to modify available pet services:

```typescript
export const SERVICES = [
  'Pet Grooming',
  'Veterinary Checkup',
  'Pet Vaccination',
  'Pet Dental Care',
  // Add your pet services
];
```

### Time Slots
Modify time slots in `src/types/booking.ts`:

```typescript
export const TIME_SLOTS = [
  '09:00', '09:30', '10:00',
  // Add your time slots
];
```

### Styling
Override CSS variables or classes:

```css
.booking-form-container {
  --primary-color: #your-color;
  max-width: 600px;
}
```

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

For integration help, see [INTEGRATION.md](./INTEGRATION.md) or run `npm run dev` for a demo.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
