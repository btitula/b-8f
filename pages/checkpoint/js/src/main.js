import "@/style.css";
import app from "@/app";
import initRouter from "@/route/router";
import { initHeaderScroll, initHeaderPopup, initHeaderAuthenticatedPopup } from "@/components/header/header";

const render = async () => {
  document.querySelector("#app").innerHTML = await app();
};

// Wrap in async IIFE to avoid top-level await issues during build
(async () => {
  await render();
  initHeaderScroll();
  initHeaderPopup();
  initHeaderAuthenticatedPopup();
  await initRouter();
})();
