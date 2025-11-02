import { CONSTANT } from './constant.js';
import { UTILS } from './utils.js';

const { COLORS, FONT_AWESOME_ICONS, TIMEOUT } = CONSTANT;
const { getItemName, formatDate, placeMenu, hideMenu } = UTILS;

const contextMenu = document.getElementById('context-menu');
const deleteModal = document.getElementById('delete-modal');
const modalButtonClose = deleteModal.querySelector('.close-button, .fa-xmark');
const modalButtonDelete = document.getElementById('button-delete');
const modalButtonCancel = document.getElementById('button-cancel');
let toastContainer;
let contextTarget = null;

/**
 * Utils
 */
// https://www.youtube.com/watch?v=EWveKYaX-P0&t=607s
const generateToast = ({ message, backgroundColor, color = COLORS.TEXT_COLOR, lifetime = `${TIMEOUT.THREE_SECONDS}ms` }) => {
  toastContainer.insertAdjacentHTML('beforeend', `
    <p class="toast" style="background-color: ${backgroundColor}; color: ${color}; animation-duration: ${lifetime};">
      ${message}
    </p>
  `);

  const toast = toastContainer.lastElementChild;
  toast.addEventListener('animationend', () => {
    toast.remove();
  }, { once: true });
}

const createToast = (type, message) => {
  const toastConfig = {
    success: {
      icon: FONT_AWESOME_ICONS.FA_CIRCLE_CHECK,
      backgroundColor: COLORS.GREEN
    },
    error: {
      icon: FONT_AWESOME_ICONS.FA_CIRCLE_EXCLAMATION,
      backgroundColor: COLORS.RED
    },
    info: {
      icon: FONT_AWESOME_ICONS.FA_CIRCLE_INFO,
      backgroundColor: COLORS.GRAY
    },
    warning: {
      icon: FONT_AWESOME_ICONS.FA_CIRCLE_EXCLAMATION,
      backgroundColor: COLORS.YELLOW
    }
  };

  const config = toastConfig[type]

  generateToast({
    message: `<i class="fa-solid ${config.icon}"></i><span>${message}</span>`,
    backgroundColor: config.backgroundColor,
    lifetime: `${TIMEOUT.THREE_SECONDS}ms`
  });
};

const showModal = () => deleteModal.classList.remove('hidden');
const hideModal = () => {
  deleteModal.classList.add('hidden');
};

/**
 * Init Toast
 */
(function initToast() {
  document.body.insertAdjacentHTML('afterbegin', `
    <div class="toast-container">
    </div>
  `);
  toastContainer = document.querySelector('.toast-container');
})();

document.getElementById('todo-list').addEventListener('contextmenu', (e) => {
  const item = e.target.closest('.todo-item');
  if (!item) return;
  e.preventDefault();
  hideMenu(contextMenu, contextTarget);

  contextTarget = item;
  contextTarget.classList.add('bg-[#6a3ee6]');

  placeMenu(contextMenu, e.clientX, e.clientY);
});

// Click outside of context menu will hide menu
document.addEventListener('click', (e) => {
  if (e.target.closest('#context-menu')) return;
  hideMenu(contextMenu, contextTarget);
});

// Esc key to hide menu
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') hideMenu(contextMenu, contextTarget);
});

modalButtonClose.addEventListener('click', () => hideModal());

const actions = {
  'file-info': (item) => {
    createToast('info', `File information "${getItemName(item).fileName}" with date modified ${getItemName(item).fileDateModified}`);
  },
  'rename': (item) => {
    const nameCell = item.querySelector('.todo-item-content:first-child');
    const dateCell = item.querySelector('.todo-item-content:last-child');
    const originalText = nameCell.textContent.trim();
    dateCell.classList.add('hidden');

    nameCell.innerHTML = `
      <form class="edit-form w-full flex">
        <input
          class="flex-grow px-4 py-3 border border-[#8758FF] text-slate-300 font-light text-sm rounded-l-sm outline-none"
          name="edit" type="text" autocomplete="off" value="${originalText}" />
        <button
          class="bg-[#8758FF] text-white text-sm px-3 py-3 rounded-r-md hover:bg-[#6a3ee6] cursor-pointer select-none"
          type="submit">Save Task</button>
      </form>
    `;

    const form = nameCell.querySelector('form');
    const input = form.querySelector('input');
    input.focus();
    input.select();

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const newText = input.value.trim();
      if (!newText || newText === originalText) {
        nameCell.textContent = originalText;
        return;
      }
      nameCell.textContent = newText;
      dateCell.textContent = formatDate(new Date());
      dateCell.classList.remove('hidden');
      createToast('success', `Renamed to "${newText}"`);
    });
  },
  'remove': (item) => {
    showModal();
    modalButtonDelete.addEventListener('click', () => {
      item.remove();
      createToast('error', `Removed "${getItemName(item).fileName}"`);
      hideModal();
    });
    modalButtonCancel.addEventListener('click', () => hideModal());
  }
};

contextMenu.addEventListener('click', (e) => {
  const li = e.target.closest('[data-action]');
  if (!li) return;
  const action = li.getAttribute('data-action');
  if (actions[action] && contextTarget) {
    actions[action](contextTarget);
  }
  hideMenu(contextMenu, contextTarget);
});
