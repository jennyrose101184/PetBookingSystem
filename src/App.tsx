import BookingWidget from './components/BookingWidget'
import './App.css'

function App() {
  return (
    <>
      <div>
        <h1>🐾 Pet Booking System</h1>
        <p>Professional booking widget for veterinary clinics and pet services.</p>
        <p>
          <strong>Integration Guide:</strong> <a href="/public/integration-guide.html" target="_blank">
            How to add this to your website
          </a>
        </p>
        <p>
          <strong>GitHub:</strong> <a href="https://github.com/jennyrose101184/PetBookingSystem" target="_blank">
            View Source Code
          </a>
        </p>
      </div>
      <BookingWidget />
    </>
  )
}

export default App
