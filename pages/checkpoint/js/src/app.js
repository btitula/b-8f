import Header from "./components/Header";
import Footer from "./components/Footer";

const app = async () => {
    return `
    ${await Header()}
    <main id="js-body"></main>
    ${Footer()}
  `
}

export default app
