const formatText = (text) => {
  // Lowercase and first letter uppercase and trim for each word  
  const formattedText = text.split(' ').map(word => word.toLowerCase().charAt(0).toUpperCase() + word.slice(1)).join(' ')
  // console.log(formattedText)
  return formattedText
}

export const UTILS = {
  formatText
}
