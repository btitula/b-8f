import headerHtml from "./header.html?raw";

export function initHeaderScroll() {
  const main = document.getElementById('js-body');
  const headerElement = document.getElementById('header');

  main?.addEventListener('scroll', () => {
    if (main.scrollTop > 10) {
      headerElement.classList.add('header-scrolled');
      headerElement.classList.remove('header-transparent');
    } else {
      headerElement.classList.remove('header-scrolled');
      headerElement.classList.add('header-transparent');
    }
  });
}

const Header = async () => {
  return headerHtml;
}

export default Header;