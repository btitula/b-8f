document.querySelectorAll('.sale-badge').forEach(el => {
  const p = parseInt(el.dataset.sale || '0', 10);
  if (!p || p <= 0) { el.style.display = 'none'; return; }
  el.setAttribute('aria-label', `Sale ${p}% off`);
  el.innerHTML = `
      <div class="_dot"></div>
      <div class="_sale">SALE</div>
      <div><span class="_number">${p}</span><span class="_percent">%</span></div>
      <div class="_off">OFF</div>
    `;
});

const sidecart = document.getElementById('sidecart');
const overlay = document.getElementById('overlay');
const openBtn = document.getElementById('openCart');
const closeBtn = document.getElementById('closeCart');

function openCart() {
  sidecart.classList.remove('translate-x-full');
  overlay.classList.remove('opacity-0', 'pointer-events-none');
}
function closeCart() {
  sidecart.classList.add('translate-x-full');
  overlay.classList.add('opacity-0', 'pointer-events-none');
}

openBtn?.addEventListener('click', openCart);
closeBtn?.addEventListener('click', closeCart);
overlay?.addEventListener('click', closeCart);
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCart(); });
