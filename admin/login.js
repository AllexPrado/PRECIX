document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value;
  // Usuário/senha fixos para MVP
  if (user === 'admin' && pass === 'precix2025') {
    localStorage.setItem('precix_admin', '1');
    window.location.href = 'dashboard.html';
  } else {
    document.getElementById('loginError').style.display = 'block';
  }
});
