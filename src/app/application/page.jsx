import Headers from "../application/components/header.jsx";
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
        {/* {children} */}
        {/* <Footer /> */}
      </main>
    </>
  );
};

export default Application;
