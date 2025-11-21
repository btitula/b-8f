// import screenCast from "../assets/icons/screenCast.svg?raw";
import SideBar from "./SideBar";

async function Header() {
  return `
    ${SideBar()}  

    <div class="flex items-center h-[64px] ">

     <div class="container mx-auto flex items-center">
        <label class="group flex items-center ml-[218px] w-[480px] h-[41.6px] border border-[#ffffff26] rounded-[8px]  bg-[#292929]">
          <span class="cursor-pointer ml-4 mr-4 ">
            <i class="fa-solid fa-magnifying-glass dark:text-[#999c9b] group-hover:text-white"></i>
          </span>
      
          <input 
            placeholder="Tìm bài hát, đĩa nhạc, nghệ sĩ, podcast" type="text" 
            class="dark:text-white outline-hidden border-hidden w-4/5 h-full text-[16px] font-semibold mb-[2px]"
          >

          <span class="flex items-center justify-center flex-1 h-full cursor-pointer">
            <i class="fa-solid fa-xmark dark:text-[#999c9b] font-normal text-[15px] group-hover:text-white" ></i>
          </span>
        </label>

        <div class="flex items-center gap-4 ml-auto ">
          <button class="cursor-pointer dark:text-white">
            <span class="w-5 h-5 inline-block dark:text-white">
            </span>
          </button>

          <button class="cursor-pointer">
            <i class="fa-solid fa-ellipsis-vertical dark:text-white text-[18px]"></i>
          </button>

          <button class="cursor-pointer dark:bg-white h-[32px] px-4 rounded-full text-[14px] font-medium">
            Đăng nhập
          </button>
        </div>
     </div>
    </div>
    `;
}

export default Header;
