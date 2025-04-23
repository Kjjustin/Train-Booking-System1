const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/trainDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// ====== Schemas ======
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});
const User = mongoose.model('User', userSchema);

const trainSchema = new mongoose.Schema({
  trainName: String,
  trainNumber: String,
  from: String,
  to: String,
  departureTime: String,
  arrivalTime: String
});
const Train = mongoose.model('Train', trainSchema);

const bookingSchema = new mongoose.Schema({
  trainId: mongoose.Schema.Types.ObjectId,
  trainName: String,
  trainNumber: String,
  from: String,
  to: String,
  date: String,
  classType: String,
  seats: Number
});
const Booking = mongoose.model('Booking', bookingSchema);

// ====== Middleware ======
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// ====== Serve Pages ======
['/', '/login', '/dashboard', '/book', '/bookings', '/admin', '/trains'].forEach(route =>
  app.get(route, (req, res) => res.sendFile(path.join(__dirname, 'public', `${route === '/' ? 'register' : route.slice(1)}.html`)))
);

// ====== User Auth ======
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.json({ message: 'User already exists' });

  const newUser = new User({ email, password });
  await newUser.save();
  res.json({ message: 'Registration successful' });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json({ message: 'User not found' });
  if (user.password !== password) return res.json({ message: 'Incorrect password' });

  res.json({ message: 'Login successful' });
});

// ====== Train API ======
app.get('/api/trains', async (req, res) => {
  try {
    const trains = await Train.find();
    res.json(trains);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching trains' });
  }
});

app.post('/api/trains', async (req, res) => {
  try {
    const newTrain = new Train(req.body);
    await newTrain.save();
    res.json({ message: 'Train added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding train' });
  }
});

app.delete('/api/trains/:id', async (req, res) => {
  try {
    await Train.findByIdAndDelete(req.params.id);
    res.json({ message: 'Train deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting train' });
  }
});

// ====== Booking API ======
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const train = await Train.findById(req.body.trainId);
    if (!train) return res.status(404).json({ message: 'Train not found' });

    const booking = new Booking({
      trainId: train._id,
      trainName: train.trainName,
      trainNumber: train.trainNumber,
      from: train.from,
      to: train.to,
      date: req.body.date,
      classType: req.body.classType,
      seats: req.body.seats
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Error booking ticket' });
  }
});

app.delete('/api/bookings/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error cancelling booking' });
  }
});

// ====== Start Server ======
app.listen(3000, () => console.log('Server started at http://localhost:3000'));
