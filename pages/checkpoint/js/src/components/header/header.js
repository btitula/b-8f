import headerHtml from "./header.html?raw";
import Login from "@/components/login/login.js";

import menuRightClickGetMusicPremiumSvg from "@/assets/images/header/menuRightClick/getMusicPremium.svg?raw";
import menuRightClickSettingsSvg from "@/assets/images/header/menuRightClick/settings.svg?raw";
import menuRightClickTermsAndPrivacyPolicySvg from "@/assets/images/header/menuRightClick/termsAndPrivacyPolicy.svg?raw";
import menuRightClickHelpSvg from "@/assets/images/header/menuRightClick/help.svg?raw";
import menuRightClickSendFeedbackSvg from "@/assets/images/header/menuRightClick/sendFeedback.svg?raw";
import menuRightClickYourChannelSvg from "@/assets/images/header/menuRightClickAuthenticated/yourChannel.svg?raw";
import menuRightClickSwitchAccountSvg from "@/assets/images/header/menuRightClickAuthenticated/switchAccount.svg?raw";
import menuRightClickSignOutSvg from "@/assets/images/header/menuRightClickAuthenticated/signOut.svg?raw";
import menuRightClickUploadMusicSvg from "@/assets/images/header/menuRightClickAuthenticated/uploadMusic.svg?raw";
import menuRightClickHistorySvg from "@/assets/images/header/menuRightClickAuthenticated/history.svg?raw";

// Shared function to open login modal
export async function openLoginModal() {
  // Check if modal already exists
  let modalOverlay = document.getElementById('modal-login-overlay');

  if (!modalOverlay) {
    // Create modal overlay
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'modal-login-overlay';
    modalOverlay.className = 'fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center opacity-0 transition-opacity duration-300';

    // Get login HTML
    const loginContent = await Login();

    // Set the modal content directly
    modalOverlay.innerHTML = `
      <button class="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-[10000]" id="close-login-modal">
        &times;
      </button>
      ${loginContent}
    `;

    document.body.appendChild(modalOverlay);

    // Execute scripts from login.html
    const signUpButton = document.getElementById('signUp');
    const signInButtonLogin = document.getElementById('signIn');
    const container = document.getElementById('container-login');

    signUpButton?.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButtonLogin?.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });

    // Add close button handler
    const closeButton = document.getElementById('close-login-modal');
    closeButton?.addEventListener('click', () => {
      modalOverlay.classList.remove('opacity-100');
      modalOverlay.classList.add('opacity-0');
      setTimeout(() => {
        modalOverlay.remove();
      }, 300);
    });

    // Close on overlay click (outside modal)
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('opacity-100');
        modalOverlay.classList.add('opacity-0');
        setTimeout(() => {
          modalOverlay.remove();
        }, 300);
      }
    });

    // Close on ESC key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        modalOverlay.classList.remove('opacity-100');
        modalOverlay.classList.add('opacity-0');
        setTimeout(() => {
          modalOverlay.remove();
          document.removeEventListener('keydown', handleEscape);
        }, 300);
      }
    };
    document.addEventListener('keydown', handleEscape);

    // Trigger animation
    setTimeout(() => {
      modalOverlay.classList.remove('opacity-0');
      modalOverlay.classList.add('opacity-100');
    }, 10);
  } else {
    // Show existing modal
    modalOverlay.classList.remove('opacity-0');
    modalOverlay.classList.add('opacity-100');
  }
}

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

function generateMenuRightClickAuthenticated() {
  return `
    <ul class="py-2 text-sm rounded-md bg-[#232323] border-[0.5px] border-white/20 text-white font-light shadow-xl ring-1 ring-black/10 role="menu" aria-orientation="vertical">
      <li class="px-3 py-2 flex items-center gap-3" data-action="right-click-your-channel"
        role="menuitem">
        <span id="header-authenticated-user" class="text-sm p-2 bg-pink-400 rounded-full border border-white/80">US</span>
        <div class="flex flex-col items-start">
          <span class="flex items-center gap-3 text-white [&_svg]:w-5 [&_svg]:h-5">Username</span>
          <span class="flex items-center gap-3 text-white [&_svg]:w-5 [&_svg]:h-5">
            <a href="#" class="cursor-pointer text-blue-500 hover:text-blue-600 transition-all duration-100">
              Manage Your Account
            </a>
          </span>
        </div>
      </li>

      <li>
        <p class="bg-[#020202] border-b-[0.5px] border-white/20 my-3"></p>
      </li>

      <li class="px-3 py-2 hover:bg-[#414141]/40 transition-all duration-100 flex items-center gap-3 cursor-pointer" data-action="right-click-start-mix"
        role="menuitem">
        <span class="flex items-center gap-3 text-white [&_svg]:w-5 [&_svg]:h-5">
          ${menuRightClickYourChannelSvg}
          <p>Your Channel</p>
        </span>
      </li>

      <li class="px-3 py-2 hover:bg-[#414141]/40 transition-all duration-100 flex items-center gap-3 cursor-pointer" data-action="right-click-play-next"
        role="menuitem">
        <span class="flex items-center gap-3 text-white [&_svg]:w-5 [&_svg]:h-5">
          ${menuRightClickGetMusicPremiumSvg}
          <p>Get Music Premium</p>
        </span>
      </li>

      <li class="px-3 py-2 hover:bg-[#414141]/40 transition-all duration-100 flex items-center gap-3 cursor-pointer" data-action="right-click-add-to-queue"
        role="menuitem">
        <span class="flex items-center gap-3 text-white [&_svg]:w-5 [&_svg]:h-5">
          ${menuRightClickSwitchAccountSvg}
          <p>Switch Account</p>
        </span>
      </li>

      <li class="px-3 py-2 hover:bg-[#414141]/40 transition-all duration-100 flex items-center gap-3 cursor-pointer" data-action="right-click-add-to-liked-songs"
        role="menuitem">
        <span class="flex items-center gap-3 text-white [&_svg]:w-5 [&_svg]:h-5">
          ${menuRightClickSignOutSvg}
          <p>Sign Out</p>
        </span>
      </li>

      <li>
        <p class="bg-[#020202] border-b-[0.5px] border-white/20 my-3"></p>
      </li>

      <li class="px-3 py-2 hover:bg-[#414141]/40 transition-all duration-100 flex items-center gap-3 cursor-pointer" data-action="right-click-save-to-playlist"
        role="menuitem">
        <span class="flex items-center gap-3 text-white [&_svg]:w-5 [&_svg]:h-5">
          ${menuRightClickUploadMusicSvg}
          <p>Upload Music</p>
        </span>
      </li>

      <li class="px-3 py-2 hover:bg-[#414141]/40 transition-all duration-100 flex items-center gap-3 cursor-pointer" data-action="right-click-save-to-playlist"
        role="menuitem">
        <span class="flex items-center gap-3 text-white [&_svg]:w-5 [&_svg]:h-5">
          ${menuRightClickHistorySvg}
          <p>History</p>
        </span>
      </li>

      <li class="px-3 py-2 hover:bg-[#414141]/40 transition-all duration-100 flex items-center gap-3 cursor-pointer" data-action="right-click-save-to-playlist"
        role="menuitem">
        <span class="flex items-center gap-3 text-white [&_svg]:w-5 [&_svg]:h-5">
          ${menuRightClickSettingsSvg}
          <p>Settings</p>
        </span>
      </li>

      <li class="px-3 py-2 hover:bg-[#414141]/40 transition-all duration-100 flex items-center gap-3 cursor-pointer" data-action="right-click-save-to-playlist"
        role="menuitem">
        <span class="flex items-center gap-3 text-white [&_svg]:w-5 [&_svg]:h-5">
          ${menuRightClickTermsAndPrivacyPolicySvg}
          <p>Terms & Privacy Policy</p>
        </span>
      </li>

      <li class="px-3 py-2 hover:bg-[#414141]/40 transition-all duration-100 flex items-center gap-3 cursor-pointer" data-action="right-click-save-to-playlist"
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

export function initHeaderAuthenticatedPopup() {
  const popup = document.getElementById('header-authenticated-popup');
  const authenticated = document.getElementById('header-authenticated-user');

  authenticated?.addEventListener('click', (e) => {
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

export async function initSignInButton() {
  const signInButton = document.querySelector('.button-signin-header');

  signInButton?.addEventListener('click', async (e) => {
    e.preventDefault();
    await openLoginModal();
  });
}

const Header = async () => {
  const templateFunction = new Function(
    'generateMenuRightClick',
    'generateMenuRightClickAuthenticated',
    `return \`${headerHtml}\`;`
  );

  return templateFunction(
    generateMenuRightClick,
    generateMenuRightClickAuthenticated,
  );
}

export default Header;