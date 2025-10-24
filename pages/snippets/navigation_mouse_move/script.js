const navigation = document.querySelector('#navigation');
const resizer = document.querySelector('#resizer');
let isResizing = false;

resizer.addEventListener('mousedown', (e) => {
  isResizing = true;
  console.log(e.clientX);
  document.body.style.cursor = 'col-resize';
});

document.addEventListener('mousemove', (e) => {
  console.log(`isResizing: ${isResizing}`);
  if (!isResizing) return;
  const newWidth = e.clientX;
  console.log(`newWidth: ${newWidth}`);
  navigation.style.width = `${newWidth}px`;
});

document.addEventListener('mouseup', () => {
  isResizing = false;
  document.body.style.cursor = 'default';
});
