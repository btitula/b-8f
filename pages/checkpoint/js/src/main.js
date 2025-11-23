import "@/style.css";
import app from "@/app";
import initRouter from "@/route/router";
import { initHeaderScroll, initHeaderPopup, initHeaderAuthenticatedPopup, initSignInButton } from "@/components/header/header";
import { initSignInButtonSideBar } from "@/components/sideBar/sideBar";

const render = async () => {
  document.querySelector("#app").innerHTML = await app();
};

// Wrap in async IIFE to avoid top-level await issues during build
(async () => {
  await render();
  initHeaderScroll();
  initHeaderPopup();
  initHeaderAuthenticatedPopup();
  initSignInButton();
  initSignInButtonSideBar();
  await initRouter();
})();
