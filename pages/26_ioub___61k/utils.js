const getItemName = (item) => {
  const itemContent = item.querySelector('.todo-item-content')
  const fileName = itemContent?.textContent?.trim() ?? `Item #${item.dataset.id}`;
  const fileDateModified = itemContent?.nextElementSibling?.textContent?.trim() ?? `Item #${item.dataset.id}`;
  return {
    fileName,
    fileDateModified
  }
}

const formatDate = (currentDate = new Date()) => {
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const placeMenu = (contextMenu, x, y) => {
  // Đặt toạ độ ban đầu theo vị trí chuột
  contextMenu.style.left = x + 'px';
  contextMenu.style.top = y + 'px';
  contextMenu.classList.remove('hidden');
};

const hideMenu = (contextMenu, contextTarget) => {
  contextMenu.classList.add('hidden');
  contextTarget?.classList.remove('bg-[#6a3ee6]');
  contextTarget = null;
}

export const UTILS = {
  getItemName,
  formatDate,
  placeMenu,
  hideMenu
}