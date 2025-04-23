document.addEventListener('DOMContentLoaded', loadBookings);

function loadBookings() {
  fetch('/api/bookings')
    .then(res => res.json())
    .then(bookings => {
      const list = document.getElementById('bookingList');
      list.innerHTML = '';

      if (bookings.length === 0) {
        list.innerHTML = '<p>No bookings found.</p>';
        return;
      }

      bookings.forEach(booking => {
        const card = document.createElement('div');
        card.className = 'card mb-3 shadow-sm';

        card.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">${booking.trainName} (${booking.trainNumber})</h5>
            <p class="card-text mb-2">
              <strong>From:</strong> ${booking.from} → <strong>To:</strong> ${booking.to}<br>
              <strong>Date:</strong> ${booking.date}, <strong>Class:</strong> ${booking.classType}, <strong>Seats:</strong> ${booking.seats}
            </p>
            <button class="btn btn-danger btn-sm" onclick="cancelBooking('${booking._id}')">Cancel Booking</button>
          </div>
        `;
        list.appendChild(card);
      });
    })
    .catch(err => console.error('Error fetching bookings:', err));
}

function cancelBooking(bookingId) {
  if (confirm('Are you sure you want to cancel this booking?')) {
    fetch(`/api/bookings/${bookingId}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        loadBookings();
      })
      .catch(err => console.error('Error cancelling booking:', err));
  }
}
