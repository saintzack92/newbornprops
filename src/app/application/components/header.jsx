"use client";
import React, { useState, useEffect } from "react";
// import Link from "next/link";
// // Import react scroll
// import { Link as LinkScroll } from "react-scroll";

// import ButtonOutline from "../misc/ButtonOutline.";
import Image from "next/image";
import LogoVPN from "../../../../public/assets/img/Logo.svg";

const Headers = () => {
  //   const [activeLink, setActiveLink] = useState(null);
  //   const [scrollActive, setScrollActive] = useState(false);
  //   useEffect(() => {
  //     window.addEventListener("scroll", () => {
  //       setScrollActive(window.scrollY > 20);
  //     });
  //   }, []);
  return (
    <header>
      <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
        <div className="col-start-1 col-end-2 flex items-center">
          <Image
            src={LogoVPN}
            className="h-8 w-auto"
            alt=""
            width="50"
            height="50"
          />
        </div>
      </nav>
    </header>
  );
};

export default Headers;

// export default function headers() {
//   return (
//     <header>
//       <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
//         <div className="col-start-1 col-end-2 flex items-center">
//           <LogoVPN className="h-8 w-auto" />
//         </div>
//       </nav>
//     </header>
//   );
// }
