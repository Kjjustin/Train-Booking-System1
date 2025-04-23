window.onload = async () => {
    const trainList = document.getElementById('trainList');
  
    try {
      const res = await fetch('/api/trains');
      const trains = await res.json();
  
      if (trains.length === 0) {
        trainList.innerHTML = '<p>No trains available.</p>';
        return;
      }
  
      trainList.innerHTML = '';
      trains.forEach(train => {
        const div = document.createElement('div');
        div.className = 'train-card';
        div.innerHTML = `
          <h3>${train.trainName} (${train.trainNumber})</h3>
          <p><strong>From:</strong> ${train.from}</p>
          <p><strong>To:</strong> ${train.to}</p>
          <p><strong>Departure:</strong> ${train.departureTime}</p>
          <p><strong>Arrival:</strong> ${train.arrivalTime}</p>
          <p><strong>Available Seats:</strong> ${train.availableSeats}</p>
          <p><strong>Classes:</strong> ${train.classes.join(', ')}</p>
        `;
        trainList.appendChild(div);
      });
    } catch (error) {
      trainList.innerHTML = '<p>Error loading trains.</p>';
      console.error(error);
    }
  };
  
//extra
const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
trainName: String,
  trainNumber: String,
  from: String,
  to: String,
  departureTime: String,
  arrivalTime: String,
  availableSeats: Number,
  classes: [String] // ['Sleeper', 'AC', 'First Class']
});

 module.exports = mongoose.model('Train', trainSchema);
