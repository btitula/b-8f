import Navigo from "navigo";
import Explore from "../pages/Explore";
import Library from "../pages/Library";
import Login from "@/components/login/login";
import Home, {
    initCarouselTodayHits, initCarouselQuickPicks, initCarouselAlbumsForYou,
    initCarouselNewMusicVideosForYou, initTodayHitsPlayButtons
} from "@/pages/home/home";
import musicPlayer from "@/utils/musicPlayer";
import { initHomeEvents } from "@/pages/home/home-events";
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
            // Initialize carousels and event handlers after rendering
            setTimeout(() => {
                initCarouselTodayHits();
                initCarouselQuickPicks();
                initCarouselAlbumsForYou();
                initCarouselNewMusicVideosForYou();
                initHomeEvents();
                // Initialize music player
                musicPlayer.init();
                initTodayHitsPlayButtons();
            }, 0);
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
