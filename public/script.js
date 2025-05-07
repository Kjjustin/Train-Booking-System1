document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  document.getElementById('message').textContent = data.message;

  if (data.message === 'Login successful') {
    // Save session info in browser
    localStorage.setItem('loggedIn', 'true');

    // Redirect to dashboard
    window.location.href = '/dashboard';
  }
});
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', () => {
  const isHidden = passwordInput.type === 'password';
  passwordInput.type = isHidden ? 'text' : 'password';
  togglePassword.src = isHidden
    ? 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/icons/eye.svg'
    : 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/icons/eye-slash.svg';
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Sample train data (you can replace this with a database if needed)
const trains = [
  {
    _id: "1",
    trainName: "Express Train",
    trainNumber: "1234",
    from: "City A",
    to: "City B",
    departureTime: "10:00 AM",
    arrivalTime: "12:00 PM",
    availableSeats: [
      { label: "A1", status: "available" },
      { label: "A2", status: "occupied" },
      { label: "B1", status: "available" },
      { label: "B2", status: "available" },
      { label: "C1", status: "occupied" },
      { label: "C2", status: "available" }
    ],
    maxSeats: 5
  },
  // Add more train objects as needed
];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to search for trains
app.get('/api/trains', (req, res) => {
  const { from, to, date } = req.query;

  // Filter trains based on the search criteria (from, to, and date)
  const filteredTrains = trains.filter(train => {
    return train.from.toLowerCase() === from.toLowerCase() &&
           train.to.toLowerCase() === to.toLowerCase();
  });

  res.json(filteredTrains); // Send the filtered trains as a response
});

// Endpoint to handle booking requests
app.post('/api/bookings', (req, res) => {
  const { trainId, date, classType, seats } = req.body;

  // Find the train from the array by trainId
  const train = trains.find(t => t._id === trainId);

  if (!train) {
    return res.status(404).json({ message: "Train not found" });
  }

  // Check if there are enough available seats for the booking
  const availableSeats = train.availableSeats.filter(seat => seat.status === "available");

  if (availableSeats.length < seats) {
    return res.status(400).json({ message: "Not enough available seats" });
  }

  // Book the seats (mark them as occupied)
  let bookedSeats = [];
  for (let i = 0; i < seats; i++) {
    const seat = availableSeats[i];
    seat.status = "occupied";  // Mark as occupied
    bookedSeats.push(seat.label);
  }

  // Generate a booking ID (e.g., using current timestamp)
  const bookingId = `BOOK-${Date.now()}`;

  // Send the booking information as a response
  res.json({
    _id: bookingId,
    trainId,
    date,
    classType,
    seats: bookedSeats,
    message: "Booking successful!"
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
