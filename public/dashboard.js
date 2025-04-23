
if (localStorage.getItem('loggedIn') !== 'true') {
    // If not logged in, send back to login page
    window.location.href = '/login';
  }
  document.getElementById('logoutBtn').addEventListener('click', () => {
  // Clear login session (localStorage or cookies)
  localStorage.removeItem('loggedIn');

  // Redirect to login page
  window.location.href = '/login';
});
