import logoYoutubeMusic from "@/assets/icons/logoYoutubeMusic.svg";
import sideBarHtml from './sideBar.html?raw';

const images = {
  logoYoutubeMusic,
};


const SideBar = async () => {
  const sideBar = sideBarHtml.replace(/\{\{(\w+)\}\}/g, (_, key) => images[key] || '');
  return sideBar;
}

export default SideBar;
