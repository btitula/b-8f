const addForm = document.getElementById('add-form')
const addInput = addForm.querySelector('input[type="text"]')
const todoList = document.getElementById('todo-list')


/**
 * Add new task
 */
addForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const text = addInput.value.trim()
  if (!text) {
    console.error('Task name is required')
    return
  }

  const newItem = document.createElement('div')
  newItem.className =
    'todo-item opacity-100 flex justify-between items-center bg-[#8758FF] py-3 px-5 rounded-sm hover:bg-[#956dfa] transition-all'
  newItem.innerHTML = `
    <div class="todo-item-content text-slate-50 font-medium text-sm flex-1">${text}</div>
    <div class="flex gap-2">
      <i class="fa-solid fa-pen-to-square text-white cursor-pointer hover:text-[#2b1c51] transition"></i>
      <i class="fa-solid fa-trash text-white cursor-pointer hover:text-[#2b1c51] transition"></i>
    </div>
  `
  todoList.appendChild(newItem)
  addInput.value = ''
})

/**
 * Delete/Edit task
 */
todoList.addEventListener('click', (e) => {
  const item = e.target.closest('.todo-item')

  // Delete task
  if (e.target.closest('.fa-trash')) {
    item.classList.add('done-item')
    item.addEventListener('transitionend', () =>
      item.style.display = 'none',
      { once: true }
    )
    return
  }

  if (e.target.closest('.fa-pen-to-square')) {
    const textDiv = item.querySelector('.todo-item-content')
    const currentText = textDiv.textContent.trim()

    const inputClass = 'flex-grow px-4 py-3 border border-[#8758FF] text-slate-300 font-light text-sm rounded-l-sm outline-none'
    const buttonClass = 'bg-[#8758FF] text-white text-sm px-3 py-3 rounded-r-md hover:bg-[#6a3ee6] cursor-pointer'

    item.className = 'todo-item w-full flex justify-center'
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
  const newText = form.elements.edit.value.trim()

  item.className =
    'todo-item opacity-100 flex justify-between items-center bg-[#8758FF] py-3 px-5 rounded-sm hover:bg-[#956dfa]'

  item.innerHTML = `
    <div class="todo-item-content text-slate-50 font-medium text-sm flex-1">${newText}</div>
    <div class="flex gap-2">
      <i class="fa-solid fa-pen-to-square text-white cursor-pointer hover:text-[#2b1c51]"></i>
      <i class="fa-solid fa-trash text-white cursor-pointer hover:text-[#2b1c51] "></i>
    </div>
  `
})