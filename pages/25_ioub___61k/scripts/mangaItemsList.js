import { CONSTANT } from '../constant.js';
import { UTILS } from './utils.js';
import { MANGA_CARTS } from './mangaCarts.js';
const { formatText, getCart } = UTILS;

const { MANGA_ITEMS } = CONSTANT;
const { addMangaItemToCart } = MANGA_CARTS;

const updateSoldCount = (document) => {
  const cart = getCart(); 
  if (!Array.isArray(cart)) return;

  const counts = {};
  for (const item of cart) {
    const id = Number(item.id);
    const quantity = Number(item.quantity) || 1;

    if (counts[id]) {
      counts[id] += quantity;
    } else {
      counts[id] = quantity;
    }
  }

  // Duyệt từng manga card có data-manga-id
  document.querySelectorAll('[data-manga-id]').forEach(card => {
    const id = Number(card.dataset.mangaId);
    const eSoldCount = card.querySelector('.sold-count');
    if (!eSoldCount) return;

    const soldQty = counts[id] || 0;
    eSoldCount.textContent = soldQty > 0 ? `Đã bán ${soldQty}` : 'Đã bán 0';
  });
};

// Send event cart:updated khi có sự thay đổi trong giỏ hàng, bên mangaCart 
// sẽ lắng nghe rồi rerender số lượng đã bán trên mangaItemsList
document.addEventListener('cart:updated', () => updateSoldCount(document));

const renderMangaItemsList = (document) => {
  const mangaItems = document.getElementById('manga-items');

  [...MANGA_ITEMS].reverse().forEach(item => {
    const mangaItem = document.createElement('div');
    mangaItem.classList.add('manga-item');

    // parse data and use for rendering manga item
    const { name, price, image, isSaled, salePercent, isPublished } = item;

    mangaItem.innerHTML = `
      <div
        class="manga-item group relative rounded-2xl border-[20px] border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(31,38,135,0.1)] overflow-hidden transition-all duration-300"
        data-manga-id="${item.id}">

        <div class="bg-white/10 border-white/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(31,38,135,0.1)]">
          <div class="relative flex flex-col items-center justify-center w-52 ">
            ${!isPublished ? `<span class="absolute top-2 left-2 bg-red-500 text-white text-xs font-light px-2 py-1 rounded-md">
              Sắp có hàng
            </span>` : ''}
            
            <img class="w-full h-full object-cover rounded-t-2xl" src="${image}" alt="${name}">
          </div>

          <div class="flex flex-col p-3 gap-2 text-black rounded-b-2xl bg-white/76 backdrop-blur-xl">
            <h2 class="text-lg font-bold">${formatText(name)}</h2>
            <ul class="flex items-center justify-between text-sm">
              <li class="text-red-800 text-lg font-semibold">${price} VNĐ</li>
              <li class="text-slate-500 text-xs font-extralight sold-count">Đã bán 01</li>
            </ul>
          </div>
        </div>
        <!-- ${isSaled ? `<div class="sale-badge" data-sale="${salePercent}"></div>` : ''} -->
        <div
          id="addMangaToCart"
          data-id="${item.id}"
          class="hover-buy-item absolute top-0 left-0 w-full h-full rounded-2xl border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(31,38,135,0.1)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
          <i
            data-id="${item.id}"
            class="fa-solid fa-plus text-white/60 text-8xl hover:text-white/80 transition-all duration-300 cursor-pointer"></i>
        </div>
      </div>
    `
    mangaItems.appendChild(mangaItem);
  });

  const addMangaToCartButtons = mangaItems.querySelectorAll('#addMangaToCart');
  addMangaToCartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      // console.log(btn.dataset.id);
      const mangaItemAddToCart = MANGA_ITEMS.find(item => item.id === Number(btn.dataset.id));
      addMangaItemToCart(document, mangaItemAddToCart);
    });
  });

  updateSoldCount(document);
}

export const MANGA_ITEMS_LIST = {
  renderMangaItemsList
}
