const formatText = (text) => {
  // Lowercase and first letter uppercase and trim for each word  
  const formattedText = text.split(' ').map(word => word.toLowerCase().charAt(0).toUpperCase() + word.slice(1)).join(' ')
  // console.log(formattedText)
  return formattedText
}

const isDuplicateTask = (todoList, taskName) => {
  for (const el of todoList.querySelectorAll('.todo-item-content')) {
    if (el.textContent.trim().toLowerCase() === taskName.trim().toLowerCase()) {
      return true;
    }
  }
  return false;
}

export const UTILS = {
  formatText,
  isDuplicateTask
}
