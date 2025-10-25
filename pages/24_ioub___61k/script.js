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

/**
 * https://www.youtube.com/watch?v=EWveKYaX-P0&t=607s
 */
function generateToast({
  message,
  backgroundColor = '#00214d',
  color = '#fffffe',
  lifetime = '3000ms'
}) {
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
    const warning = document.createElement('p')
    warning.className = 'text-red-400 opacity-50 text-xs mt-2 font-light flex items-center gap-1 w-full px-10'
    warning.innerHTML = `
      <i class="fa-solid fa-circle-exclamation"></i>
      <span>Text can not be empty</span>
    `
    addForm.insertAdjacentElement('afterend', warning)
    // Them hieu ung fade out sau 2s
    setTimeout(() => warning.remove(), 2000)
    return
  }

  if (isDuplicateTask(text)) {
    generateToast({
      message: `<i class="fa-solid fa-circle-exclamation"></i>
              <span>Task already exists</span>`,
      backgroundColor: 'lightgray',
      color: '#191A40',
      lifetime: '3000ms'
    });
    return;
  }

  const newItem = document.createElement('div')
  newItem.className =
    'todo-item opacity-100 flex justify-between items-center bg-[#8758FF] py-3 px-5 rounded-sm hover:bg-[#6a3ee6] transition-all'
  newItem.innerHTML = `
    <div class="todo-item-content select-none text-slate-50 font-medium text-sm flex-1">${text}</div>
    <div class="flex gap-2">
      <i class="fa-solid fa-pen-to-square text-white cursor-pointer hover:text-[#1A1A40] transition"></i>
      <i class="fa-solid fa-trash text-white cursor-pointer hover:text-[#1A1A40] transition"></i>
    </div>
  `
  todoList.appendChild(newItem)
  addInput.value = ''

  generateToast({
    message: `
      <i class="fa-solid fa-circle-plus"></i>
      <span>Task added successfully</span>`,
    backgroundColor: '#01EDC7',
    color: '#191A40',
    lifetime: '3000ms'
  });
})

/**
 * Delete/Edit task
 */

const deleteModal = document.getElementById('delete-modal');
const modalButtonDelete = document.getElementById('button-delete');
const modalButtonCancel = document.getElementById('button-cancel');
const modalButtonClose = deleteModal.querySelector('.close-button, .fa-xmark');

const showModal = () => {
  deleteModal.classList.remove('hidden');
}
const hideModal = () => {
  deleteModal.classList.add('hidden');
  itemToDelete = null;
};
let itemToDelete = null;

todoList.addEventListener('click', (e) => {
  const item = e.target.closest('.todo-item')

  /**
   * mark item as done when click todo item
   */
  if (e.target.closest('.todo-item-content')) {
    item.classList.toggle('completed-item')
    let message = 'Todo item marked as not done'
    if (item.classList.contains('completed-item')) {
      message = 'Todo item marked as done'
    }
    generateToast({
      message: `
      <i class="fa-solid fa-circle-check"></i>
      <span>${message}</span>`,
      backgroundColor: 'lightgray',
      color: '#191A40',
      lifetime: '3000ms'
    });
  }

  // Delete task
  if (e.target.closest('.fa-trash')) {
    itemToDelete = e.target.closest('.todo-item');
    // console.log(`item to delete: ${itemToDelete}`);
    if (!itemToDelete) return;
    showModal();

    modalButtonClose.addEventListener('click', () => {
      hideModal();
    });

    modalButtonCancel.addEventListener('click', () => {
      hideModal();
    });

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
        <i class="fa-solid fa-circle-xmark"></i>
        <span>Todo item deleted successfully</span>`,
        backgroundColor: '#FE546E',
        color: '#191A40',
        lifetime: '3000ms'
      });
      hideModal();
      return
    });
  }

  // Edit task
  if (e.target.closest('.fa-pen-to-square')) {
    const textDiv = item.querySelector('.todo-item-content')
    const currentText = textDiv.textContent.trim()

    const inputClass = 'flex-grow px-4 py-3 border border-[#8758FF] text-slate-300 font-light text-sm rounded-l-sm outline-none'
    const buttonClass = 'bg-[#8758FF] text-white text-sm px-3 py-3 rounded-r-md hover:bg-[#6a3ee6] cursor-pointer select-none'


    if (item.classList.contains('completed-item')) {
      console.log('completed-item')
      item.className = 'todo-item w-full flex flex-col justify-center completed-item'
    } else {
      console.log('not completed-item')
      item.className = 'todo-item w-full flex flex-col justify-center'
    }


    item.innerHTML = `
      <form class="edit-form w-full flex">
        <input name="edit"
          type="text"
          value="${currentText}"
          class="${inputClass}" />
        <button type="submit"
          class="${buttonClass}">
          Save Task
        </button>
      </form>
    `
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
    icon.className = 'fa-solid fa-circle-exclamation'
    warning.appendChild(icon)

    const span = document.createElement('span')
    span.textContent = 'Task name can not be empty'
    warning.appendChild(span)

    item.appendChild(warning)
    return
  }

  if (item.classList.contains('completed-item')) {
    console.log('completed-item')
    item.className =
      'todo-item opacity-100 flex justify-between items-center bg-[#8758FF] py-3 px-5 rounded-sm hover:bg-[#956dfa] completed-item'
  } else {
    console.log('not completed-item')
    item.className =
      'todo-item opacity-100 flex justify-between items-center bg-[#8758FF] py-3 px-5 rounded-sm hover:bg-[#956dfa]'
  }

  // item.className =
  //   'todo-item opacity-100 flex justify-between items-center bg-[#8758FF] py-3 px-5 rounded-sm hover:bg-[#956dfa]'

  item.innerHTML = `
    <div class="todo-item-content select-none text-slate-50 font-medium text-sm flex-1">${newText}</div>
    <div class="flex gap-2">
      <i class="fa-solid fa-pen-to-square text-white cursor-pointer hover:text-[#1A1A40]"></i>
      <i class="fa-solid fa-trash text-white cursor-pointer hover:text-[#1A1A40] "></i>
    </div>
  `
  generateToast({
    message: `
      <i class="fa-solid fa-circle-info"></i>
      <span>Todo item updated successfully</span>`,
    backgroundColor: '#FDE44C',
    color: '#191A40',
    lifetime: '3000ms'
  });
})
