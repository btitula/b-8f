import { UTILS } from './utils.js';
const { deDuplicateCart, getCart, setCart, totalQty, getCartTotals, formatPrice } = UTILS;

const createMangaCartController = (document) => {
  const elements = {
    sidecart: document.getElementById('sidecart'),
    overlay: document.getElementById('overlay'),
    openBtn: document.getElementById('openCart'),
    closeBtn: document.getElementById('closeCart')
  };

  if (!elements.sidecart || !elements.overlay) {
    console.warn('Required cart elements not found');
    return null;
  }

  function open() {
    deDuplicateCart();
    // luôn render mới trước khi show để có dữ liệu lần đầu
    renderMangaCartContent(document);

    const { sidecart, overlay } = elements;
    sidecart.classList.remove('translate-x-full', 'hidden');
    overlay.classList.remove('opacity-0', 'pointer-events-none');
  }

  function close() {
    const { sidecart, overlay } = elements;
    sidecart.classList.add('translate-x-full', 'hidden');
    overlay.classList.add('opacity-0', 'pointer-events-none');
  }

  function handleEscape(e) { if (e.key === 'Escape') close(); }

  elements.openBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    renderMangaCartContent(document);
    open();
  });
  elements.closeBtn?.addEventListener('click', (e) => { e.preventDefault(); close(); });
  elements.overlay?.addEventListener('click', (e) => { e.preventDefault(); close(); });
  window.addEventListener('keydown', handleEscape);
  return { open, close };
}

const showMangaCartCount = (document) => {
  const count = getCart().length;
  updateMangaCartBadgeCount(document, count);
}

const renderMangaCartSummary = (document) => {
  const { subPrice, shipPrice, discountPrice } = getCartTotals();
  const byId = (id) => document.getElementById(id);

  const eSubPrice = byId('js-sub-price');
  const eFinalPrice = byId('js-final-price');
  const eShipPrice = byId('js-ship-price');
  const eDiscountPrice = byId('js-discount-price');
  const finalPrice = subPrice + shipPrice - discountPrice;

  if (eSubPrice) eSubPrice.textContent = `${formatPrice(subPrice)} VNĐ`;
  if (eShipPrice) eShipPrice.textContent = `${formatPrice(shipPrice)} VNĐ`;
  if (eDiscountPrice) eDiscountPrice.textContent = `${formatPrice(discountPrice)} VNĐ`;
  if (eFinalPrice) eFinalPrice.textContent = `${formatPrice(finalPrice)} VNĐ`;
};

const removeMangaItemFromCart = (document, mangaId) => {
  // Show spinner on the item being removed
  const row = document.querySelector(`.item-info[data-id="${mangaId}"]`);
  if (row) {
    row.style.opacity = '0.5';
    row.style.pointerEvents = 'none';

    // Add spinner overlay
    const spinner = document.createElement('div');
    spinner.className = 'absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-lg';
    spinner.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-white text-2xl"></i>';
    row.style.position = 'relative';
    row.appendChild(spinner);
  }

  // Wait 0.5 seconds before removing
  setTimeout(() => {
    const cart = getCart();
    const id = cart.findIndex(i => Number(i.id) === Number(mangaId));
    if (id > -1) {
      cart.splice(id, 1);
    }
    setCart(cart);
    updateMangaCartBadgeCount(document);
    renderMangaCartController(document);
    renderMangaCartContent(document);
    renderMangaCartSummary(document);
  }, 500);
}

const updateMangaCartItemQuantity = (document, mangaId, delta) => {
  let cart = getCart().map(i => ({ ...i, quantity: i.quantity || 1 }));
  const id = cart.findIndex(i => Number(i.id) === Number(mangaId));
  if (id === -1) return;

  cart[id].quantity += delta;

  // stop at 1
  if (cart[id].quantity < 1) {
    cart[id].quantity = 1;
  }

  // console.log('debug-cart', cart);
  setCart(cart);

  // update badge cart count
  updateMangaCartBadgeCount(document);
  renderMangaCartController(document);
  renderMangaCartSummary(document);

  // update quantity of manga item on DOM (if still exists)
  const row = document.querySelector(`.item-info[data-id="${mangaId}"]`);
  if (!row) return;

  if (cart.find(i => Number(i.id) === Number(mangaId))) {
    const quantityEl = row.querySelector('.js-qty');
    
    // Add total quantity: 28.000VND x 5
    const priceQuantityEl = row.querySelector('.js-price-quantity');
    const currentItem = cart.find(i => Number(i.id) === Number(mangaId));
    const currentQuantity = currentItem?.quantity;

    if (quantityEl) quantityEl.textContent = currentQuantity;
    if (priceQuantityEl) {
      priceQuantityEl.textContent = `${formatPrice(currentItem.price)} VNĐ x ${currentQuantity}`;
    }
  } else {
    // already removed from cart, remove node from HTML
    row.remove();
  }
};

// Get current sort order from icon class
const getSortOrderFromIcon = (document) => {
  const sortBtn = document.getElementById('sortByPrice');
  if (!sortBtn) return null;

  const icon = sortBtn.querySelector('i');
  if (!icon) return null;

  if (icon.classList.contains('fa-arrow-up')) {
    return 'asc';
  } else if (icon.classList.contains('fa-arrow-down')) {
    return 'desc';
  }
  return null;
};

// Toggle sort icon between ASC and DESC
const toggleSortIcon = (document) => {
  const sortBtn = document.getElementById('sortByPrice');
  if (!sortBtn) return;

  const icon = sortBtn.querySelector('i');
  if (!icon) return;

  const currentOrder = getSortOrderFromIcon(document);

  if (currentOrder === 'asc') {
    icon.className = 'fa-solid fa-arrow-down';
  } else {
    icon.className = 'fa-solid fa-arrow-up';
  }
};

// Sort cart items by total price (quantity * price)
const sortCartByPrice = (cart, order) => {
  if (!order) return cart;

  return [...cart].sort((a, b) => {
    const totalA = (a.quantity || 1) * a.price;
    const totalB = (b.quantity || 1) * b.price;

    return order === 'asc' ? totalA - totalB : totalB - totalA;
  });
};

// Toggle sort button visibility based on cart content
const toggleSortButtonVisibility = (document, isEmpty) => {
  const sortBtn = document.getElementById('sortByPrice');
  if (!sortBtn) return;

  if (isEmpty) {
    sortBtn.classList.add('hidden');
  } else {
    sortBtn.classList.remove('hidden');
  }
};

const renderMangaCartContent = (document) => {
  const cartContent = document.getElementById('cart-content');
  if (!cartContent) return;

  let cart = deDuplicateCart();

  // Toggle sort button visibility based on cart content
  toggleSortButtonVisibility(document, cart.length === 0);

  // Apply sorting based on icon state
  const currentSortOrder = getSortOrderFromIcon(document);
  cart = sortCartByPrice(cart, currentSortOrder);
  cartContent.innerHTML = `
    <div class="flex items-center justify-center gap-2 m-auto text-white/60 opacity-50 mt-5">
      <i class="fa-solid fa-face-frown-open text-2xl"></i>
      <span>Giỏ hàng trống</span>
    </div>
  `

  if (cart.length > 0) {
    cartContent.innerHTML = `
      <div class="cart-total rounded-lg p-2 bg-white/10 border border-white/20 ">
        <div class="flex flex-col gap-4 border-b border-white/10 pb-4">
          <div class="flex items-center justify-between">
            <span>Tổng tiền</span>
            <span id="js-sub-price" class="font-extralight">0 VNĐ</span>
          </div>
          <div class="flex items-center justify-between">
            <span>Phí vận chuyển (Giao hàng tiêu chuẩn)</span>
            <span id="js-ship-price" class="font-extralight">0 VNĐ</span>
          </div>
          <div class="flex items-center justify-between">
            <span>Giảm giá</span>
            <span id="js-discount-price" class="font-extralight">0 VNĐ</span>
          </div>
        </div>
        <div class="flex flex-col gap-4 pt-4">
          <div class="flex items-center justify-between font-semibold rounded-lg p-2
                      bg-[radial-gradient(circle_at_50%_25%,rgba(255,255,255,0.15)_0%,transparent_70%),linear-gradient(135deg,#ffd600_0%,#ffb300_25%,#fb8c00_50%,#f4511e_75%,#d32f2f_100%)]
                      bg-cover bg-fixed backdrop-blur-xl">
            <span>Tổng Số Tiền (gồm VAT)</span>
            <span id="js-final-price">0 VNĐ</span>
          </div>
          <button type="button"
            class="w-full rounded-lg p-2 bg-white/10 hover:bg-white/20 border border-white/20 cursor-not-allowed hover:text-white">
            <span>Thanh toán</span>
            <i class="fa-solid fa-circle-check"></i>
          </button>
        </div>
      </div>
    `;
  }

  cart.forEach(item => {
    const cartMangaItem = document.createElement('div');
    cartMangaItem.classList.add('manga-item');
    cartMangaItem.innerHTML = `
      <div data-id="${item.id}" class="item-info flex items-start justify-between gap-2 border-b-1 border-white/10 py-4">
        <div class="item-cart-image basis-1/5 rounded-md overflow-hidden">
          <img src="${item.image}" alt="${item.name} ${item.chapter}">
        </div>
        <div class="item-cart-content basis-3/5 flex flex-col gap-5">
          <ul class="flex flex-col gap-2">
            <li class="text-base font-semibold">${item.name} <i class="fa-solid fa-bookmark"></i> ${item.chapter}</li>
            <li class="text-sm font-normal">${item.description}</li>
            <li
              class="text-sm font-thin overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
              ${item.shortContent}
              </li>
          </ul>

          <ul class="flex items-center justify-between text-sm">
            <li>
              <ul class="flex items-center justify-start text-sm gap-1">
                <li><i class="fa-solid fa-money-bill-1"></i></li>
                <li class="js-price-quantity">${formatPrice(item.price)} VNĐ x ${item.quantity}</li>
              </ul>
            </li>
            <li>
              <ul
                class="js-remove-item flex items-center justify-start text-sm gap-1 cursor-pointer hover:text-white/60 transition-all duration-300"
                data-id="${item.id}">
                <li><i class="fa-solid fa-trash" data-id="${item.id}"></i></li>
                <li>Xoá sản phẩm</li>
              </ul>
            </li>
          </ul>
        </div>
      
        <div class="item-cart-action basis-1/5">
          <ul class="flex items-center justify-center gap-1">
            <li class="js-add-quantity cursor-pointer w-[24px] h-[24px] bg-white/10 hover:bg-white/20 hover:text-white/60 transition-all duration-300 border border-white/20 rounded-full flex items-center justify-center">
              <i class="fa-solid fa-plus"></i>
            </li>
            <li class="js-qty w-[32px] h-[32px] bg-white/10 border border-white/20 rounded-full flex items-center justify-center">
              ${item.quantity}
            </li>
            <li class="js-sub-quantity cursor-pointer w-[24px] h-[24px] bg-white/10 hover:bg-white/20 hover:text-white/60 transition-all duration-300 border border-white/20 rounded-full flex items-center justify-center">
              <i class="fa-solid fa-minus"></i>
            </li>
          </ul>
        </div>
      </div>
    `
    cartContent.appendChild(cartMangaItem);
  });

  cartContent.onclick = (e) => {
    const row = e.target.closest('.item-info[data-id]');
    if (!row) return;
    const id = Number(row.dataset.id);
    if (e.target.closest('.js-add-quantity')) return updateMangaCartItemQuantity(document, id, +1);
    if (e.target.closest('.js-sub-quantity')) return updateMangaCartItemQuantity(document, id, -1);
    if (e.target.closest('.js-remove-item')) return removeMangaItemFromCart(document, id);
  };

  const sortBtn = document.getElementById('sortByPrice');
  if (sortBtn) {
    const newSortBtn = sortBtn.cloneNode(true);
    sortBtn.parentNode.replaceChild(newSortBtn, sortBtn);

    newSortBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleSortIcon(document);
      renderMangaCartContent(document);
    });
  }

  renderMangaCartSummary(document);
}

const renderMangaCartController = (document) => {
  const el = document.getElementById('cartCountItems');
  if (!el) return;
  el.textContent = `(${totalQty(getCart())} sản phẩm)`;
}

const updateMangaCartBadgeCount = (document) => {
  const cartCount = document.getElementById('cartCount');
  if (!cartCount) return;

  const qty = totalQty(getCart());
  if (qty > 10) {
    cartCount.textContent = '10+';
  } else {
    cartCount.textContent = qty;
  }
  cartCount.classList.toggle('hidden', qty === 0);
}

/**
 * Create flying animation from image to cart button
 * https://www.youtube.com/watch?v=8dbhqsq-HKA
 */
const createFlyingAnimation = (originalImage) => {
  const openCartBtn = document.getElementById('openCart');
  if (!openCartBtn) return;

  // Clone the image
  const flyingImage = originalImage.cloneNode(true);
  flyingImage.removeAttribute('id'); // Remove ID to avoid duplicates

  // Get positions
  const imageRect = originalImage.getBoundingClientRect();
  const cartRect = openCartBtn.getBoundingClientRect();

  // Calculate movement distance
  const moveX = cartRect.left + (cartRect.width / 2) - (imageRect.left + imageRect.width / 2);
  const moveY = cartRect.top + (cartRect.height / 2) - (imageRect.top + imageRect.height / 2);

  // Set initial position and CSS variables
  flyingImage.style.cssText = `
    position: fixed !important;
    left: ${imageRect.left}px;
    top: ${imageRect.top}px;
    width: ${imageRect.width}px;
    height: ${imageRect.height}px;
    --move-x: ${moveX}px;
    --move-y: ${moveY}px;
  `;

  // Add flying class
  flyingImage.classList.add('flying-img');

  // Append to body
  document.body.appendChild(flyingImage);

  // Remove after animation completes
  setTimeout(() => {
    flyingImage.remove();
  }, 1000);
}

const addMangaItemToCart = (document, mangaItem) => {
  /**
   * Create flying image clone and animate it
   * https://www.youtube.com/watch?v=8dbhqsq-HKA
   */
  const originalImage = document.getElementById(`manga-item-image-${mangaItem.id}`);
  if (!originalImage) {
    console.warn(`Image not found: manga-item-image-${mangaItem.id}`);
  } else {
    createFlyingAnimation(originalImage);
  }

  let cart = deDuplicateCart();
  const id = cart.findIndex(i => Number(i.id) === Number(mangaItem.id));

  if (id > -1) {
    cart[id].quantity += 1;
  } else {
    cart.push({ ...mangaItem, quantity: 1 });
  }

  setCart(cart);
  updateMangaCartBadgeCount(document);
  renderMangaCartController(document);
  renderMangaCartContent(document);
  renderMangaCartSummary(document);


  // trigger event để cập nhật số lượng đã bán trên mangaItemsList
  document.dispatchEvent(new CustomEvent('cart:updated'));
};

export const MANGA_CARTS = {
  addMangaItemToCart,
  createFlyingAnimation,
  createMangaCartController,
  getSortOrderFromIcon,
  removeMangaItemFromCart,
  renderMangaCartContent,
  renderMangaCartController,
  renderMangaCartSummary,
  showMangaCartCount,
  sortCartByPrice,
  toggleSortButtonVisibility,
  toggleSortIcon,
  updateMangaCartBadgeCount,
  updateMangaCartItemQuantity,
}
