import headerHtml from "./header.html?raw";

import menuRightClickGetMusicPremiumSvg from "@/assets/images/header/menuRightClick/getMusicPremium.svg?raw";
import menuRightClickSettingsSvg from "@/assets/images/header/menuRightClick/settings.svg?raw";
import menuRightClickTermsAndPrivacyPolicySvg from "@/assets/images/header/menuRightClick/termsAndPrivacyPolicy.svg?raw";
import menuRightClickHelpSvg from "@/assets/images/header/menuRightClick/help.svg?raw";
import menuRightClickSendFeedbackSvg from "@/assets/images/header/menuRightClick/sendFeedback.svg?raw";

function generateMenuRightClick() {
  return `
    <ul class="py-2 text-sm rounded-md bg-[#232323] border-[0.5px] border-white/20 text-white font-light shadow-xl ring-1 ring-black/10 role="menu" aria-orientation="vertical">
      <li class="px-3 py-2 hover:bg-[#414141]/40 transition-all duration-100 flex items-center gap-3 cursor-pointer" data-action="right-click-start-mix"
        role="menuitem">
        <span class="flex items-center gap-3 text-white [&_svg]:w-5 [&_svg]:h-5">
          ${menuRightClickGetMusicPremiumSvg}
          <p>Get Music Premium</p>
        </span>
      </li>

      <li class="px-3 py-2 hover:bg-[#414141]/40 transition-all duration-100 flex items-center gap-3 cursor-pointer" data-action="right-click-play-next"
        role="menuitem">
        <span class="flex items-center gap-3 text-white [&_svg]:w-5 [&_svg]:h-5">
          ${menuRightClickSettingsSvg}
          <p>Settings</p>
        </span>
      </li>

      <li class="px-3 py-2 hover:bg-[#414141]/40 transition-all duration-100 flex items-center gap-3 cursor-pointer" data-action="right-click-add-to-queue"
        role="menuitem">
        <span class="flex items-center gap-3 text-white [&_svg]:w-5 [&_svg]:h-5">
          ${menuRightClickTermsAndPrivacyPolicySvg}
          <p>Terms & Privacy Policy</p>
        </span>
      </li>

      <li class="px-3 py-2 hover:bg-[#414141]/40 transition-all duration-100 flex items-center gap-3 cursor-pointer" data-action="right-click-add-to-liked-songs"
        role="menuitem">
        <span class="flex items-center gap-3 text-white [&_svg]:w-5 [&_svg]:h-5">
          ${menuRightClickHelpSvg}
          <p>Help</p>
        </span>
      </li>

      <li class="px-3 py-2 hover:bg-[#414141]/40 transition-all duration-100 flex items-center gap-3 cursor-pointer" data-action="right-click-save-to-playlist"
        role="menuitem">
        <span class="flex items-center gap-3 text-white [&_svg]:w-5 [&_svg]:h-5">
          ${menuRightClickSendFeedbackSvg}
          <p>Send Feedback</p>
        </span>
      </li>
    </ul>
  `
}

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

export function initHeaderPopup() {
  const popup = document.getElementById('header-signin-popup');
  const ellipsisIcon = document.querySelector('.fa-ellipsis-vertical');

  ellipsisIcon?.closest('a')?.addEventListener('click', (e) => {
    e.preventDefault();
    const isHidden = popup.classList.contains('opacity-0');

    if (isHidden) {
      popup.classList.remove('opacity-0', 'scale-0');
      popup.classList.add('opacity-100', 'scale-100');
      popup.classList.remove('pointer-events-none');
      popup.classList.add('pointer-events-auto');
    } else {
      popup.classList.remove('opacity-100', 'scale-100');
      popup.classList.add('opacity-0', 'scale-0');
      popup.classList.remove('pointer-events-auto');
      popup.classList.add('pointer-events-none');
    }
  });

  document.addEventListener('click', (e) => {
    if (!popup.contains(e.target) && !ellipsisIcon?.closest('a')?.contains(e.target)) {
      popup.classList.remove('opacity-100', 'scale-100');
      popup.classList.add('opacity-0', 'scale-0');
      popup.classList.remove('pointer-events-auto');
      popup.classList.add('pointer-events-none');
    }
  });
}

const Header = async () => {
  const templateFunction = new Function(
    'generateMenuRightClick',
    `return \`${headerHtml}\`;`
  );

  return templateFunction(
    generateMenuRightClick,
  );
}

export default Header;