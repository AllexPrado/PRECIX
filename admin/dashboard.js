// Protege o painel admin
if (localStorage.getItem('precix_admin') !== '1') {
  window.location.href = 'login.html';
}

document.getElementById('logoutBtn').onclick = () => {
  localStorage.removeItem('precix_admin');
  window.location.href = 'login.html';
};

// Exemplo: status de sync e contagem de produtos (mock)
document.getElementById('syncStatus').querySelector('span').textContent = 'Atualizado hoje às 08:00';
document.getElementById('productCount').querySelector('span').textContent = '...'; // Aqui pode ser integrado com backend futuramente

// Upload de banners (mock)
document.getElementById('addBannerBtn').onclick = () => {
  alert('Funcionalidade de upload de banner será implementada.');
};

document.getElementById('updateLogoBtn').onclick = () => {
  alert('Funcionalidade de atualização de logo será implementada.');
};
