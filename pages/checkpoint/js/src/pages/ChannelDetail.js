import authSevice from "../service/authSevice";

async function ChannelDetail() {
    const slug = location.href.split("/").at(-1);

    const data = await authSevice.currentUser(`/channel/${slug}`);
    return `
       <div class="dark:text-white ml-[250px]">
            trang channel
        </div>
    `;
}

export default ChannelDetail;
