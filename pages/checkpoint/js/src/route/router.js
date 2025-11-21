import Navigo from "navigo";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Library from "../pages/Library";
import ChannelDetail from "../pages/ChannelDetail";

const router = new Navigo("/", {
    hash: false,
    linksSelector: "a",
});

const initRouter = async () => {
    const page = document.querySelector("#js-body");
    router
        .on("/", () => {
            page.innerHTML = Home();
        })
        .on("/explore", () => {
            page.innerHTML = Explore();
        })
        .on("/library", () => {
            page.innerHTML = Library();
        })
        .on("/channel/:slug", async () => {
            page.innerHTML = await ChannelDetail();
        })
        .resolve();
};

export default initRouter;
