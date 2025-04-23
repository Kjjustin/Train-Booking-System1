// Fetch and display trains
async function fetchTrains() {
  try {
    const res = await fetch('/api/trains');
    const trains = await res.json();

    const listDiv = document.getElementById('trainList');
    listDiv.innerHTML = '';

    trains.forEach(train => {
      listDiv.innerHTML += `
        <div class="train-card">
          <strong>${train.trainName} (${train.trainNumber})</strong><br>
          ${train.from} → ${train.to}<br>
          Departure: ${train.departureTime}, Arrival: ${train.arrivalTime}<br>
          <button onclick="deleteTrain('${train._id}')">🗑️ Delete</button>
          <hr/>
        </div>
      `;
    });
  } catch (err) {
    console.error('Error fetching trains:', err);
  }
}

// Add new train
document.getElementById('addTrainForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const train = {
    trainName: document.getElementById('trainName').value,
    trainNumber: document.getElementById('trainNumber').value,
    from: document.getElementById('from').value,
    to: document.getElementById('to').value,
    departureTime: document.getElementById('departureTime').value,
    arrivalTime: document.getElementById('arrivalTime').value,
  };

  try {
    const res = await fetch('/api/trains', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(train)
    });

    const result = await res.json();
    document.getElementById('trainMessage').innerText = result.message;

    document.getElementById('addTrainForm').reset();
    fetchTrains();
  } catch (err) {
    console.error('Error adding train:', err);
    document.getElementById('trainMessage').innerText = 'Error adding train';
  }
});

// Delete train
async function deleteTrain(id) {
  try {
    await fetch(`/api/trains/${id}`, { method: 'DELETE' });
    fetchTrains();
  } catch (err) {
    console.error('Error deleting train:', err);
  }
}

// Fetch all bookings
async function fetchBookings() {
  try {
    const res = await fetch('/api/bookings');
    const bookings = await res.json();

    const adminDiv = document.getElementById('adminBookings');
    if (bookings.length === 0) {
      adminDiv.innerHTML = '<p>No bookings found.</p>';
      return;
    }

    let table = `
      <table>
        <thead>
          <tr>
            <th>Train</th>
            <th>Date</th>
            <th>Class</th>
            <th>Seats</th>
          </tr>
        </thead>
        <tbody>
    `;

    bookings.forEach(b => {
      table += `
        <tr>
          <td>${b.trainId}</td>
          <td>${b.date}</td>
          <td>${b.classType}</td>
          <td>${b.seats}</td>
        </tr>
      `;
    });

    table += '</tbody></table>';
    adminDiv.innerHTML = table;

  } catch (err) {
    console.error('Error fetching bookings:', err);
    document.getElementById('adminBookings').innerHTML = '<p>Error loading bookings.</p>';
  }
}

// Load data on page load
window.onload = () => {
  fetchTrains();
  fetchBookings();
};
