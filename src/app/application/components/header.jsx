"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
// // Import react scroll
import { Link as LinkScroll } from "react-scroll";

// import ButtonOutline from "../misc/ButtonOutline.";
import Image from "next/image";
import LogoVPN from "../../../../public/assets/img/Logo.svg";

const Headers = () => {
  const [activeLink, setActiveLink] = useState(null);
  const [scrollActive, setScrollActive] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollActive(window.scrollY > 20);
    });
  }, []);
  return (
    <header
      className={
        "fixed top-0 w-full z-30 bg-gray-50 transition-all " +
        (scrollActive ? " shadow-md pt-0" : " pt-4")
      }
    >
      <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
        <div className="col-start-1 col-end-2 flex items-center">
          <Image src={LogoVPN} className="h-8 w-auto" alt="" />
        </div>
        <ul className="hidden lg:flex col-start-4 col-end-8 text-black  items-center">
          <LinkScroll
            activeClass="active"
            to="about"
            spy={true}
            smooth={true}
            duration={1000}
            onSetActive={() => {
              setActiveLink("about");
            }}
            className={
              "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
              (activeLink === "about"
                ? " text-orange-500 animation-active "
                : " text-black hover:text-orange-500 a")
            }
          >
            About
          </LinkScroll>
          <LinkScroll
            activeClass="active"
            to="feature"
            spy={true}
            smooth={true}
            duration={1000}
            onSetActive={() => {
              setActiveLink("feature");
            }}
            className={
              "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
              (activeLink === "feature"
                ? " text-orange-500 animation-active "
                : " text-black hover:text-orange-500 ")
            }
          >
            Feature
          </LinkScroll>
          <LinkScroll
            activeClass="active"
            to="pricing"
            spy={true}
            smooth={true}
            duration={1000}
            onSetActive={() => {
              setActiveLink("pricing");
            }}
            className={
              "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
              (activeLink === "pricing"
                ? " text-orange-500 animation-active "
                : " text-black hover:text-orange-500 ")
            }
          >
            Pricing
          </LinkScroll>
          <LinkScroll
            activeClass="active"
            to="testimoni"
            spy={true}
            smooth={true}
            duration={1000}
            onSetActive={() => {
              setActiveLink("testimoni");
            }}
            className={
              "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
              (activeLink === "testimoni"
                ? " text-orange-500 animation-active "
                : " text-black hover:text-orange-500 ")
            }
          >
            Testimonial
          </LinkScroll>
        </ul>
        <div className="col-start-10 col-end-12 font-medium flex justify-end items-center">
          <Link href="/">
            <div className="text-black-600 mx-2 sm:mx-4 capitalize tracking-wide hover:text-orange-500 transition-all">
                Sign In
            </div>
          </Link>
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
