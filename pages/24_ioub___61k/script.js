import { CONSTANT } from './constant.js';
import { UTILS } from './utils.js';

const { COLORS, MESSAGE, FONT_AWESOME_ICONS, TIMEOUT } = CONSTANT;
const { formatText, isDuplicateTask, createElementWithClass } = UTILS;

const addForm = document.getElementById('add-form')
const addInput = addForm.querySelector('input[type="text"]')
const todoList = document.getElementById('todo-list')
let toastContainer;

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
  console.log(config)

  generateToast({
    message: `<i class="fa-solid ${config.icon}"></i><span>${message}</span>`,
    backgroundColor: config.backgroundColor,
    lifetime: `${TIMEOUT.THREE_SECONDS}ms`
  });
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


/**
 * Add new task
 */
addForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const text = formatText(addInput.value.trim())
  if (!text) {
    // Avoid XSS
    /**
      const warning = document.createElement('p');
      warning.className = 'text-red-400 opacity-50 text-xs mt-2 font-light flex items-center gap-1 w-full px-10'
      warning.innerHTML = `
        <i class="fa-solid ${FONT_AWESOME_ICONS.FA_CIRCLE_EXCLAMATION}"></i>
        <span>${MESSAGE.TEXT_EMPTY}</span>
      `
      addForm.insertAdjacentElement('afterend', warning)
      // Them hieu ung fade out sau 2s
      setTimeout(() => warning.remove(), TIMEOUT.TWO_SECONDS)
      return
     */
  
    const warning = createElementWithClass('p', 'text-red-400 opacity-50 text-xs mt-2 font-light flex items-center gap-1 w-full px-10')
    const icon = createElementWithClass('i', `fa-solid ${FONT_AWESOME_ICONS.FA_CIRCLE_EXCLAMATION}`)
    warning.appendChild(icon);

    const messageSpan = document.createElement('span');
    messageSpan.innerText = MESSAGE.TEXT_EMPTY;
    warning.appendChild(messageSpan);

    addForm.insertAdjacentElement('afterend', warning);
    // Them hieu ung fade out sau 2s
    setTimeout(() => warning.remove(), TIMEOUT.TWO_SECONDS);
    return;
  }

  if (isDuplicateTask(todoList, text)) {
    createToast('info', MESSAGE.ADD_TASK_ERROR)
    return;
  }

  // Avoid XSS
  /**
    const newItem = document.createElement('div')
    newItem.className =
      'todo-item opacity-100 flex justify-between items-center bg-[#8758FF] py-3 px-5 rounded-sm hover:bg-[#6a3ee6] transition-all cursor-pointer'
    newItem.innerHTML = `
      <div class="todo-item-content select-none text-slate-50 font-medium text-sm flex-1">${text}</div>
      <div class="flex gap-2">
        <i class="fa-solid ${FONT_AWESOME_ICONS.FA_PENCIL} text-white cursor-pointer hover:text-[#1A1A40] transition"></i>
        <i class="fa-solid ${FONT_AWESOME_ICONS.FA_TRASH} text-white cursor-pointer hover:text-[#1A1A40] transition"></i>
      </div>
    `
    todoList.appendChild(newItem)
   */
  const newItem = createElementWithClass('div', 'todo-item opacity-100 flex justify-between items-center bg-[#8758FF] py-3 px-5 rounded-sm hover:bg-[#6a3ee6] transition-all cursor-pointer')
  const textDiv = createElementWithClass('div', 'todo-item-content select-none text-slate-50 font-medium text-sm flex-1', text)
  newItem.appendChild(textDiv);

  const iconDiv = createElementWithClass('div', 'flex gap-2')
  const pencilIcon = createElementWithClass('i', `fa-solid ${FONT_AWESOME_ICONS.FA_PENCIL} text-white cursor-pointer hover:text-[#1A1A40] transition`)
  const trashIcon = createElementWithClass('i', `fa-solid ${FONT_AWESOME_ICONS.FA_TRASH} text-white cursor-pointer hover:text-[#1A1A40] transition`)
  iconDiv.appendChild(pencilIcon)
  iconDiv.appendChild(trashIcon)

  newItem.appendChild(iconDiv);
  todoList.appendChild(newItem);
  addInput.value = ''

  createToast('success', MESSAGE.ADD_TASK_SUCCESS)
})

/**
 * Delete/Edit task
 */

const deleteModal = document.getElementById('delete-modal');
const modalButtonDelete = document.getElementById('button-delete');
const modalButtonCancel = document.getElementById('button-cancel');
const modalButtonClose = deleteModal.querySelector('.close-button, .fa-xmark');

const showModal = () => deleteModal.classList.remove('hidden');
const hideModal = () => {
  deleteModal.classList.add('hidden');
  itemToDelete = null;
};
let itemToDelete = null;

todoList.addEventListener('click', (e) => {
  const item = e.target.closest('.todo-item')

  // Mark item as done when click todo item
  if (e.target.closest('.todo-item-content')) {
    item.classList.toggle('completed-item')
    let message = item.classList.contains('completed-item') ? MESSAGE.MARK_TASK_AS_COMPLETED : MESSAGE.MARK_TASK_AS_UNDONE
    createToast('info', message)
  }

  // Delete task
  if (e.target.closest(`.${FONT_AWESOME_ICONS.FA_TRASH}`)) {
    itemToDelete = e.target.closest('.todo-item');
    if (!itemToDelete) return;
    showModal();

    modalButtonClose.addEventListener('click', () => hideModal());
    modalButtonCancel.addEventListener('click', () => hideModal());
    modalButtonDelete.addEventListener('click', () => {
      if (!itemToDelete) return;

      // console.log("Item deleted!");
      item.classList.add('done-item')
      item.addEventListener('transitionend', () =>
        item.style.display = 'none',
        itemToDelete.remove(),
        { once: true }
      )

      createToast('error', MESSAGE.DELETE_TASK_SUCCESS)
      hideModal();
      return
    });
  }

  // Edit task
  if (e.target.closest(`.${FONT_AWESOME_ICONS.FA_PENCIL}`)) {
    const textDiv = item.querySelector('.todo-item-content')
    const currentText = textDiv.textContent.trim()

    const inputClass = 'flex-grow px-4 py-3 border border-[#8758FF] text-slate-300 font-light text-sm rounded-l-sm outline-none'
    const buttonClass = 'bg-[#8758FF] text-white text-sm px-3 py-3 rounded-r-md hover:bg-[#6a3ee6] cursor-pointer select-none'

    const baseClassName = 'todo-item w-full flex flex-col justify-center';
    item.className = item.classList.contains('completed-item') ? `${baseClassName} completed-item` : baseClassName;

    // Avoid XSS
    /**
      item.innerHTML = `
        <form class="edit-form w-full flex">
          <input name="edit"
            type="text" value="${currentText}" class="${inputClass}" />
          <button type="submit"
            class="${buttonClass}">
            Save Task
          </button>
        </form>
      `
      item.appendChild(editForm);
     */
    item.classList.add('w-full', 'flex', 'flex-col', 'justify-center')
    while (item.firstChild) item.removeChild(item.firstChild)

    const editForm = createElementWithClass('form', 'edit-form w-full flex')

    const input = createElementWithClass('input', inputClass)
    input.name = 'edit'
    input.type = 'text'
    input.value = currentText
    input.autocomplete = 'off'

    const saveBtn = createElementWithClass('button', buttonClass, 'Save Task')
    saveBtn.type = 'submit'

    editForm.appendChild(input)
    editForm.appendChild(saveBtn)
    item.appendChild(editForm)
  }
})

todoList.addEventListener('submit', (e) => {
  e.preventDefault()

  const form = e.target
  const item = form.closest('.todo-item')
  const newText = formatText(form.elements.edit.value.trim())

  if (!newText) {
    const warning = createElementWithClass('p', 'text-red-400 opacity-50 text-xs mt-1 font-light')
    const icon = createElementWithClass('i', `fa-solid ${FONT_AWESOME_ICONS.FA_CIRCLE_EXCLAMATION}`)
    warning.appendChild(icon)

    const span = createElementWithClass('span', MESSAGE.TEXT_EMPTY)
    warning.appendChild(span)

    item.appendChild(warning)
    return
  }

  // Check if having duplicate task name while editing task
  if (isDuplicateTask(todoList, newText)) {
    createToast('info', MESSAGE.ADD_TASK_ERROR)
    return;
  }

  const baseClassName = 'todo-item opacity-100 flex justify-between items-center bg-[#8758FF] py-3 px-5 rounded-sm hover:bg-[#956dfa]';
  item.className = item.classList.contains('completed-item') ? `${baseClassName} completed-item` : baseClassName;

  // Avoid XSS
  /**
    item.innerHTML = `
      <div class="todo-item-content select-none text-slate-50 font-medium text-sm flex-1">${newText}</div>
      <div class="flex gap-2">
        <i class="fa-solid ${FONT_AWESOME_ICONS.FA_PENCIL} text-white cursor-pointer hover:text-[#1A1A40]"></i>
        <i class="fa-solid ${FONT_AWESOME_ICONS.FA_TRASH} text-white cursor-pointer hover:text-[#1A1A40] "></i>
      </div>
    `
   */
  while (item.firstChild) item.removeChild(item.firstChild)
  const contentDiv = createElementWithClass('div', 'todo-item-content select-none text-slate-50 font-medium text-sm flex-1', newText)
  const iconContainer = createElementWithClass('div', 'flex gap-2')
  const editIcon = createElementWithClass('i', `fa-solid ${FONT_AWESOME_ICONS.FA_PENCIL} text-white cursor-pointer hover:text-[#1A1A40]`)
  const trashIcon = createElementWithClass('i', `fa-solid ${FONT_AWESOME_ICONS.FA_TRASH} text-white cursor-pointer hover:text-[#1A1A40]`)

  iconContainer.appendChild(editIcon)
  iconContainer.appendChild(trashIcon)

  item.appendChild(contentDiv)
  item.appendChild(iconContainer)

  createToast('warning', MESSAGE.UPDATE_TASK_SUCCESS)
})
