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
