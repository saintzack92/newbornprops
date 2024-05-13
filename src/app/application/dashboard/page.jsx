import Headers from "../components/header.jsx";
import Footers from "../components/footer.jsx";
import Hero from "./hero.jsx";
import Feature from "./feature.jsx";
import Pricing from "./pricing.jsx";
import { SlidersExample } from "./slider.jsx";

const Application = () => {
  return (
    <>
      <header>
        <Headers />
      </header>
      <main>
        <Hero />
        <Feature />
        <SlidersExample />
        <Pricing />
      </main>
      <footer>
        <Footers />
      </footer>
    </>
  );
};

export default Application;
