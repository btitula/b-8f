const LS_KEY = 'hyHyCartMangaItems';
const getCart = () => getLocalStorageStoreMangaItemAddToCart(LS_KEY);
const setCart = (arr) => setLocalStorageStoreMangaItemAddToCart(LS_KEY, arr);

const formatText = (text) => {
  const formattedText = text.split(' ').map(word => word.toLowerCase().charAt(0).toUpperCase() + word.slice(1)).join(' ')
  return formattedText
}

const deDuplicateCart = () => {
  const mangaItems = getCart();
  const grouped = {};

  // Gộp các item trùng id và cộng dồn quantity
  for (const item of mangaItems) {
    const id = item.id;
    const quantity = Number(item.quantity) || 1;

    if (grouped[id]) {
      grouped[id].quantity += quantity;
    } else {
      grouped[id] = { ...item, quantity };
    }
  }

  const didDeDuplicateCart = Object.values(grouped);
  setCart(didDeDuplicateCart);
  return didDeDuplicateCart;
};

const setLocalStorageStoreMangaItemAddToCart = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

const getLocalStorageStoreMangaItemAddToCart = (key) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : [];
}

const renderSaleBadge = (element) => {
  const salePercent = parseInt(element.dataset.sale || '0', 10);

  if (!salePercent || salePercent <= 0) {
    element.classList.add('hidden');
    return;
  }

  element.setAttribute('aria-label', `Sale ${salePercent}% off`);
  element.innerHTML = `
    <div class="_dot"></div>
    <div class="_sale">SALE</div>
    <div><span class="_number">${salePercent}</span><span class="_percent">%</span></div>
    <div class="_off">OFF</div>
  `;
}

const totalQty = (arr) => arr.reduce((s, i) => s + (i.quantity || 1), 0);

const formatPrice = (price) => {
  return price.toLocaleString('vi-VN', { style: 'decimal' });
}

const getCartTotals = () => {
  const cart = getCart();
  const subPrice = cart.reduce((s, i) => s + (i.price * (i.quantity || 1)), 0);
  const shipPrice = 15000;
  const discountPrice = 2000;
  return { subPrice, shipPrice, discountPrice, qty: totalQty(cart) };
};

export const UTILS = {
  deDuplicateCart,
  formatPrice,
  formatText,
  getCart,
  getCartTotals,
  renderSaleBadge,
  setCart,
  totalQty,
}
