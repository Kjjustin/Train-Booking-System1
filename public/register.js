const form = document.getElementById('registerForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  const response = await fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  document.getElementById('message').innerText = data.message;
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