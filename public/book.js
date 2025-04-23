document.getElementById('bookForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const date = document.getElementById('date').value;
    const travelClass = document.getElementById('class').value;
    const seats = document.getElementById('seats').value;
  
    const res = await fetch(`/api/trains?from=${from}&to=${to}&date=${date}`);
    const trains = await res.json();
  
    const resultsDiv = document.getElementById('trainResults');
    resultsDiv.innerHTML = '<h3>Available Trains</h3>';
  
    trains.forEach(train => {
      const btn = `<button onclick="bookNow('${train._id}', '${travelClass}', ${seats})">Book</button>`;
      resultsDiv.innerHTML += `
        <div class="train-card">
          <strong>${train.trainName}</strong> (${train.trainNumber})<br>
          ${train.from} → ${train.to}<br>
          Departure: ${train.departureTime} | Arrival: ${train.arrivalTime}<br>
          ${btn}
          <hr/>
        </div>
      `;
    });
  });
  
  async function bookNow(trainId, classType, seats) {
    const date = document.getElementById('date').value;
  
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trainId, date, classType, seats })
    });
  
    const data = await res.json();
    alert(`Ticket Booked Successfully! Booking ID: ${data._id}`);
  }
  