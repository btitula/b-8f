import "@/style.css";
import app from "@/app";
import initRouter from "@/route/router";

const render = async () => {
  document.querySelector("#app").innerHTML = await app();
};

await render();
await initRouter();
