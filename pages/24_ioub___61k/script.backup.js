import { CONSTANT } from './constant.js';
const { COLORS, MESSAGE, FONT_AWESOME_ICONS, TIMEOUT } = CONSTANT;

const addForm = document.getElementById('add-form')
const addInput = addForm.querySelector('input[type="text"]')
const todoList = document.getElementById('todo-list')
let toastContainer;

/**
 * Utils
 */
function formatText(text) {
  // Lowercase and first letter uppercase and trim for each word  
  const formattedText = text.split(' ').map(word => word.toLowerCase().charAt(0).toUpperCase() + word.slice(1)).join(' ')
  // console.log(formattedText)
  return formattedText
}

// https://www.youtube.com/watch?v=EWveKYaX-P0&t=607s
function generateToast({ message, backgroundColor, color = COLORS.TEXT_COLOR, lifetime = `${TIMEOUT.THREE_SECONDS}ms` }) {
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

function isDuplicateTask(text) {
  for (const el of todoList.querySelectorAll('.todo-item-content')) {
    if (el.textContent.trim().toLowerCase() === text.trim().toLowerCase()) {
      return true;
    }
  }
  return false;
}

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
    const warning = document.createElement('p');
    warning.className = 'text-red-400 opacity-50 text-xs mt-2 font-light flex items-center gap-1 w-full px-10';

    const icon = document.createElement('i');
    icon.className = `fa-solid ${FONT_AWESOME_ICONS.FA_CIRCLE_EXCLAMATION}`;
    warning.appendChild(icon);

    const messageSpan = document.createElement('span');
    messageSpan.innerText = MESSAGE.TEXT_EMPTY;
    warning.appendChild(messageSpan);

    addForm.insertAdjacentElement('afterend', warning);
    // Them hieu ung fade out sau 2s
    setTimeout(() => warning.remove(), TIMEOUT.TWO_SECONDS);
    return;
  }

  if (isDuplicateTask(text)) {
    generateToast({
      message: `
        <i class="fa-solid ${FONT_AWESOME_ICONS.FA_CIRCLE_EXCLAMATION}"></i>
        <span>${MESSAGE.ADD_TASK_ERROR}</span>`,
      backgroundColor: COLORS.GRAY
    });
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
  const newItem = document.createElement('div');
  newItem.className = 'todo-item opacity-100 flex justify-between items-center bg-[#8758FF] py-3 px-5 rounded-sm hover:bg-[#6a3ee6] transition-all cursor-pointer';

  const textDiv = document.createElement('div');
  textDiv.className = 'todo-item-content select-none text-slate-50 font-medium text-sm flex-1';
  textDiv.textContent = text;
  newItem.appendChild(textDiv);

  const iconDiv = document.createElement('div');
  iconDiv.className = 'flex gap-2';
  iconDiv.innerHTML = `
    <i class="fa-solid ${FONT_AWESOME_ICONS.FA_PENCIL} text-white cursor-pointer hover:text-[#1A1A40] transition"></i>    
    <i class="fa-solid ${FONT_AWESOME_ICONS.FA_TRASH} text-white cursor-pointer hover:text-[#1A1A40] transition"></i>
  `;

  newItem.appendChild(iconDiv);
  todoList.appendChild(newItem);
  addInput.value = ''

  generateToast({
    message: `
      <i class="fa-solid ${FONT_AWESOME_ICONS.FA_CIRCLE_PLUS}"></i>
      <span>${MESSAGE.ADD_TASK_SUCCESS}</span>`,
    backgroundColor: COLORS.GREEN
  });
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

  /**
   * Mark item as done when click todo item
   */
  if (e.target.closest('.todo-item-content')) {
    item.classList.toggle('completed-item')
    // let message = 'Todo item marked as undone'
    // if (item.classList.contains('completed-item')) {
    //   message = 'Todo item marked as completed'
    // }

    let message = item.classList.contains('completed-item') ? MESSAGE.MARK_TASK_AS_COMPLETED : MESSAGE.MARK_TASK_AS_UNDONE

    generateToast({
      message: `
        <i class="fa-solid ${FONT_AWESOME_ICONS.FA_CIRCLE_CHECK}"></i>
        <span>${message}</span>`,
      backgroundColor: COLORS.GRAY
    });
  }

  // Delete task
  if (e.target.closest(`.${FONT_AWESOME_ICONS.FA_TRASH}`)) {
    itemToDelete = e.target.closest('.todo-item');
    // console.log(`item to delete: ${itemToDelete}`);
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
      generateToast({
        message: `
        <i class="fa-solid ${FONT_AWESOME_ICONS.FA_CIRCLE_XMARK}"></i>
        <span>${MESSAGE.DELETE_TASK_SUCCESS}</span>`,
        backgroundColor: COLORS.RED
      });
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

    // if (item.classList.contains('completed-item')) {
    //   console.log('completed-item')
    //   item.className = 'todo-item w-full flex flex-col justify-center completed-item'
    // } else {
    //   console.log('not completed-item')
    //   item.className = 'todo-item w-full flex flex-col justify-center'
    // }

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

    const editForm = document.createElement('form')
    editForm.className = 'edit-form w-full flex'

    const input = document.createElement('input')
    input.name = 'edit'
    input.type = 'text'
    input.value = currentText         // <-- safe: use property, not interpolated HTML
    input.className = inputClass
    input.autocomplete = 'off'

    const saveBtn = document.createElement('button')
    saveBtn.type = 'submit'
    saveBtn.className = buttonClass
    saveBtn.textContent = 'Save Task' // safe text node

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

  // console.log(newText)
  if (!newText) {
    const warning = document.createElement('p')
    warning.className = 'text-red-400 opacity-50 text-xs mt-1 font-light'

    const icon = document.createElement('i')
    icon.className = `fa-solid ${FONT_AWESOME_ICONS.FA_CIRCLE_EXCLAMATION}`
    warning.appendChild(icon)

    const span = document.createElement('span')
    span.textContent = MESSAGE.TEXT_EMPTY
    warning.appendChild(span)

    item.appendChild(warning)
    return
  }

  // if (item.classList.contains('completed-item')) {
  //   console.log('completed-item')
  //   item.className =
  //     'todo-item opacity-100 flex justify-between items-center bg-[#8758FF] py-3 px-5 rounded-sm hover:bg-[#956dfa] completed-item'
  // } else {
  //   console.log('not completed-item')
  //   item.className =
  //     'todo-item opacity-100 flex justify-between items-center bg-[#8758FF] py-3 px-5 rounded-sm hover:bg-[#956dfa]'
  // }

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

  const contentDiv = document.createElement('div')
  contentDiv.className = 'todo-item-content select-none text-slate-50 font-medium text-sm flex-1'
  contentDiv.textContent = newText  // SAFE: assigns text, not HTML

  const iconContainer = document.createElement('div')
  iconContainer.className = 'flex gap-2'

  const editIcon = document.createElement('i')
  editIcon.className = `fa-solid ${FONT_AWESOME_ICONS.FA_PENCIL} text-white cursor-pointer hover:text-[#1A1A40]`

  const trashIcon = document.createElement('i')
  trashIcon.className = `fa-solid ${FONT_AWESOME_ICONS.FA_TRASH} text-white cursor-pointer hover:text-[#1A1A40]`

  iconContainer.appendChild(editIcon)
  iconContainer.appendChild(trashIcon)

  item.appendChild(contentDiv)
  item.appendChild(iconContainer)


  generateToast({
    message: `
      <i class="fa-solid ${FONT_AWESOME_ICONS.FA_CIRCLE_INFO}"></i>
      <span>${MESSAGE.UPDATE_TASK_SUCCESS}</span>`,
    backgroundColor: COLORS.YELLOW
  });
})
