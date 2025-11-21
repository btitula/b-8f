import PlaylistTags from "../components/PlaylistTags";
import authSevice from "../service/authSevice";

function Home() {
    const PlaylistTagsName = [
        {
            name: "nạp năng lượng",
        },
        {
            name: "đi chơi",
        },
        {
            name: "uống nước",
        },
        {
            name: "đi xe đạp",
        },
        {
            name: "đến trường",
        },
        {
            name: "ok chư",
        },
    ];

    // const user = authSevice.currentUser();

    return `
    <div class="container mx-auto ">
      <div class="ml-[240px]">
        ${PlaylistTagsName.map((element) => {
            return PlaylistTags(element.name);
        }).join("")}
        
      </div>
    </div>
    `;
}

export default Home;
