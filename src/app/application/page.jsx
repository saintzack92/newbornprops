import Headers from "../application/components/header.jsx";
import Hero from "../application/hero.jsx";

const Application = ({ customClass }) => {
  return (
    <>
      <header>
        <Headers />
      </header>
      <main >
        <Hero />
        {/* {children} */}
        {/* <Footer /> */}
      </main>

    </>
  );
};

export default Application;
