import Headers from "../components/header.jsx";
import Footers from "../components/footer.jsx";
import Hero from "./hero.jsx";
import Feature from "./feature.jsx";
import Pricing from "./pricing.jsx";

const Application = () => {
  return (
    <>
      <header>
        <Headers />
      </header>
      <main>
        <Hero />
        <Feature />
        <Pricing />
      </main>
      <footer>
        <Footers />
      </footer>
    </>
  );
};

export default Application;
