import Navigo from "navigo";
import Explore from "../pages/Explore";
import Library from "../pages/Library";
import Home, { initCarouselTodayHits } from "@/pages/home/Home";
import ChannelDetail from "../pages/ChannelDetail";

const router = new Navigo("/", {
    hash: false,
    linksSelector: "a",
});

const initRouter = async () => {
    const page = document.querySelector("#js-body");

    router
        .on("/", async () => {
            page.innerHTML = await Home();
            // Initialize carousel after rendering
            setTimeout(() => initCarouselTodayHits(), 0);
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
