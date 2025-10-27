// const nextButton = document.getElementById('next');
// const previousButton = document.getElementById('previous');

// nextButton.addEventListener('click', () => {
//   const currentActive = document.querySelector('.products .active');
//   const nextElement = currentActive.nextElementSibling;
  
//   if (nextElement) {
//     currentActive.classList.remove('active');
//     nextElement.classList.add('active');
//   } else {
//     currentActive.classList.remove('active');
//     document.querySelector('.products').firstElementChild.classList.add('active');
//   }
// });

// previousButton.addEventListener('click', () => {
//   const currentActive = document.querySelector('.products .active');
//   const prevElement = currentActive.previousElementSibling;
  
//   if (prevElement) {
//     currentActive.classList.remove('active');
//     prevElement.classList.add('active');
//   } else {
//     currentActive.classList.remove('active');
//     document.querySelector('.products').lastElementChild.classList.add('active');
//   }
// });

// document.addEventListener('DOMContentLoaded', () => {
//   const menu = document.querySelector('.menu');
//   const menuItems = menu.querySelectorAll('li');

//   menuItems.forEach(item => {
//     // Kiem tra xem li co chua submenu <ul> con ?
//     const submenu = item.querySelector('ul');

//     if (submenu) {
//       item.addEventListener('click', (e) => {
//         item.classList.toggle('active');
//         submenu.classList.toggle('show');

//         const dropdownIcon = item.querySelector('.flex span:last-child');
//         if (dropdownIcon) {
//           dropdownIcon.style.transform = item.classList.contains('active')
//             ? 'rotate(180deg)'
//             : 'rotate(0)';
//         }
//       });
//     }
//   });

//   document.addEventListener('click', (e) => {
//     if (!menu.contains(e.target)) {
//       const activeItems = menu.querySelectorAll('li.active');
//       activeItems.forEach(item => {
//         item.classList.remove('active');

//         const submenu = item.querySelector('ul');
//         if (submenu) submenu.classList.remove('show');

//         const dropdownIcon = item.querySelector('.flex span:last-child');
//         if (dropdownIcon) dropdownIcon.style.transform = 'rotate(0)';
//       });
//     }
//   });
// });


document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu');
  const menuItems = menu.querySelectorAll('li');

  // Hàm đóng 1 <li> có submenu
  const closeItem = (li) => {
    li.classList.remove('active');
    const submenu = li.querySelector('ul');
    if (submenu) submenu.classList.remove('show');
    const dropdownIcon = li.querySelector('.flex span:last-child');
    if (dropdownIcon) dropdownIcon.style.transform = 'rotate(0)';
  };

  // Hàm đóng tất cả <li> active trong 1 cấp (siblings)
  const closeSiblings = (li) => {
    const parent = li.parentElement; // <ul> chứa li hiện tại
    Array.from(parent.children).forEach((sib) => {
      if (sib !== li && sib.classList && sib.classList.contains('active')) {
        closeItem(sib);
      }
    });
  };

  // Gán listener cho những li có submenu
  menuItems.forEach((item) => {
    const submenu = item.querySelector('ul');
    if (!submenu) return;

    item.addEventListener('click', (e) => {
      // Chỉ toggle khi click ở "header" của item (không phải bên trong submenu)
      // Nếu click xuất phát từ một ul KHÁC ul cha của item -> bỏ qua
      if (e.target.closest('ul') !== item.parentElement) return;

      // Mở/đóng item hiện tại, nhưng trước khi mở thì đóng các sibling
      const willOpen = !item.classList.contains('active');
      closeSiblings(item);      // bảo đảm chỉ 1 item mở trong cùng cấp

      if (willOpen) {
        item.classList.add('active');
        submenu.classList.add('show');
        const dropdownIcon = item.querySelector('.flex span:last-child');
        if (dropdownIcon) dropdownIcon.style.transform = 'rotate(180deg)';
      } else {
        closeItem(item);
      }
    });
  });

  // Click ra ngoài menu => đóng tất cả
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target)) {
      const activeItems = menu.querySelectorAll('li.active');
      activeItems.forEach(closeItem);
    }
  });
});