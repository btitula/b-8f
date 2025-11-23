import logoYoutubeMusic from "@/assets/icons/logoYoutubeMusic.svg";
import sideBarHtml from './sideBar.html?raw';
import { openLoginModal } from '@/components/header/header';

const images = {
  logoYoutubeMusic,
};

export async function initSignInButtonSideBar() {
  const signInButton = document.getElementById('button-signin-side-bar');

  signInButton?.addEventListener('click', async (e) => {
    e.preventDefault();
    await openLoginModal();
  });
}

const SideBar = async () => {
  const sideBar = sideBarHtml.replace(/\{\{(\w+)\}\}/g, (_, key) => images[key] || '');
  return sideBar;
}

export default SideBar;
