// import Header from "@/components/Header";
import SideBar from "@/components/sideBar/sideBar";
import Header from "@/components/header/header";
import Footer from "@/components/Footer";

const app = async () => {
  return `
    ${await SideBar()}
    <div class="fixed top-0 left-60 right-0 bottom-0 flex justify-center">
      <div class="w-full relative">
        ${await Header()}
        <main id="js-body" class="p-4 h-full overflow-auto"></main>
      </div>
    </div>
  `
}

export default app
