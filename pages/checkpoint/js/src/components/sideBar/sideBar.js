import logoYoutubeMusic from "@/assets/icons/logoYoutubeMusic.svg";
import sideBarHtml from './sideBar.html?raw'; // Vite raw import

const images = {
  logoYoutubeMusic,
};


// function SideBar() {
//   return `
//     <div class="fixed w-60 h-full border-r border-r-[#292929]">
//       <div class="flex pl-6 items-center gap-4 h-16">
//         <button class="cursor-pointer">
//           <i class="fa-solid fa-bars dark:text-white size-full text-xl"></i>
//         </button>
//         <a href="#">
//           <img src=${logoYoutubeMusic} alt="Logo Youtube Music">
//         </a>
//       </div>

//       <div>
//         <ul>
//         <li>
//           <a class="dark:text-white" href="/">trang chủ</a>
//         </li>
//         <li>
//           <a class="dark:text-white" href="/explore">khám phá</a>
//         </li>
//         <li>
//           <a class="dark:text-white" href="/library">thư viện</a>
//         </li>
//         </ul>
//       </div>
//     </div>
//   `;
// }

function sideBar() {
  const sideBar = sideBarHtml.replace(/\{\{(\w+)\}\}/g, (_, key) => images[key] || '');
  return sideBar;
}

export default sideBar;
