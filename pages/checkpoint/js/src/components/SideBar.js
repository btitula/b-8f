import logo from "../assets/icons/logo.svg";

function SideBar() {
    return `
        <div class="fixed  w-60 h-full border-r border-r-[#292929]">
            <div class="flex gap-[24px] items-center pl-[20px] h-[64px] ">
                <button class="cursor-pointer size-[24px]">
                     <i class="fa-solid fa-bars dark:text-white text-[20px] size-full "></i>
                 </button>
    
                <a href="#">
                    <img src=${logo} alt="music" class="object-cover">
                </a>
            </div>

            <div>
                <a class="dark:text-white" href="/">trang chủ</a>
                <a class="dark:text-white" href="/explore">khám phá</a>
                <a class="dark:text-white" href="/library">thư viện</a>
                <a class="dark:text-white" href="/channel/${randomSlug}">đến trang channel</a>
            </div>
        </div>
    `;
}

export default SideBar;
