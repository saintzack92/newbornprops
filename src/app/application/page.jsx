import Headers from "../application/components/header.jsx";
import Footers from "../application/components/footer.jsx";
import Hero from "../application/hero.jsx";
import Feature from "../application/feature.jsx";
import Pricing from "../application/pricing.jsx";

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
