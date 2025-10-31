const ul = document.querySelector('ul');
let liSelected = null;

const handleClick = (e) => {
  if (e.target.nodeName === 'LI') {
    if (liSelected) {
      liSelected.classList.remove('selected');
    }
    e.target.classList.add('selected');
    liSelected = e.target;
  } else {
    if (liSelected) {
      liSelected.classList.remove('selected');
    }
    liSelected = null;
  }
}

document.addEventListener('click', handleClick);

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === 'ArrowDown') {
    if (liSelected) {
      // console.log(liSelected.textContent);
      const cloneLi = liSelected.cloneNode(true);
      cloneLi.classList.remove('selected');
      ul.insertBefore(cloneLi, liSelected.nextElementSibling);
    }
  }
});
