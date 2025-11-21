import "@/style.css";
import app from "@/app";
import initRouter from "@/route/router";
import { initHeaderScroll } from "@/components/header/header";

const render = async () => {
  document.querySelector("#app").innerHTML = await app();
};

await render();
initHeaderScroll();
await initRouter();
