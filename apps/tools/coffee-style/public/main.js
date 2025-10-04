const topMenu = document.getElementById('b-top-menu');
const topMenuToggleIcon = document.getElementById('b-top-menu-toggle-icon');

let isMenuOpen = false;

document.addEventListener('click', (event) => {
  if (event.target.id === 'b-top-menu-toggle-icon') {
    toggleMenu();
  } else {
    // click outside topMenu
    if (isMenuOpen) {
      closeMenu();
    }
  }
});

function toggleMenu() {
  if (isMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

function openMenu() {
  topMenu.classList.remove('hidden');
  topMenu.classList.remove('b-top-menu-hamburger-slide-up');
  topMenu.classList.add('b-top-menu-hamburger-slide-down');
  isMenuOpen = true;
}

function closeMenu() {
  topMenu.classList.remove('b-top-menu-hamburger-slide-down');
  topMenu.classList.add('b-top-menu-hamburger-slide-up');
  
  // Hide menu after animation completes
  setTimeout(() => {
    topMenu.classList.add('hidden');
    topMenu.classList.remove('b-top-menu-hamburger-slide-up');
  }, 200); // Match the animation duration
  
  isMenuOpen = false;
}