const todoList = document.getElementById('todo-list');
const todoItems = document.querySelectorAll('#todo-item');

todoItems.forEach(item => {
  const deleteIcon = item.querySelector('.fa-trash')
  deleteIcon.addEventListener('click', () => {
    item.classList.add('done-item')
    item.addEventListener(
      'transitionend', //  lang nghe event khi transition xong
      () => {
        item.style.display = 'none'
      },
      { once: true }
    )
  })


  const editIcon = item.querySelector('.fa-pen-to-square')
  const textDiv = item.querySelector('.todo-item-content')

  editIcon.addEventListener('click', () => {
    console.log(textDiv.textContent)
    const currentText = textDiv.textContent.trim()

    const editForm = document.createElement('form')
    editForm.className = 'w-full flex'

    // Create input field (pre-filled)
    const input = document.createElement('input')
    input.type = 'text'
    input.value = currentText
    input.className =
      'flex-grow px-4 py-3 border border-[#8758FF] text-slate-300 font-light text-sm rounded-l-sm outline-none bg-[#1A1A40]'

    // Create Save button
    const saveBtn = document.createElement('button')
    saveBtn.type = 'submit'
    saveBtn.textContent = 'Save Task'
    saveBtn.className =
      'bg-[#8758FF] text-white text-sm px-3 py-3 rounded-r-md hover:bg-[#6a3ee6] transition-all cursor-pointer'

    // Append input + button
    editForm.appendChild(input)
    editForm.appendChild(saveBtn)

    // Replace original content with the form
    item.innerHTML = '' // clear task display
    item.className = 'todo-item w-full flex justify-center' // same styling as edit form container
    item.appendChild(editForm)


    editForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const newText = input.value.trim() || 'Untitled Task'

      // Restore task view with updated text
      item.className =
        'todo-item opacity-100 flex justify-between items-center bg-[#8758FF] py-3 px-5 rounded-sm hover:bg-[#956dfa] transition-all'
      item.innerHTML = `
        <div class="todo-item-content text-slate-50 font-medium text-sm flex-1">${newText}</div>
        <div class="flex gap-2">
          <i class="fa-solid fa-pen-to-square text-white cursor-pointer hover:text-[#2b1c51] transition"></i>
          <i class="fa-solid fa-trash text-white cursor-pointer hover:text-[#2b1c51] transition"></i>
        </div>
      `
    })
  })
});
