import Headerd from "../application/components/header.jsx";
import Hero from "../application/hero.jsx";

const Application = () => {
  return (
    <div className="bg-gray-50">
      <Headerd />
      <Hero />
      {/* {children} */}
      {/* <Footer /> */}
    </div>
  );
};

export default Application;
