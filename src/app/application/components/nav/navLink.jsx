"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import navItems from "./myLinks";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

// type NavItem = {
//   label: string,
//   link?: string,
//   children?: NavItem[],
//   iconImage?: string,
// };

export default function navLinka() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [animationParent] = useAutoAnimate();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isSideMenuOpen, setSideMenue] = useState(false);
  function openSideMenu() {
    setSideMenue(true);
  }
  function closeSideMenu() {
    setSideMenue(false);
  }

  return (
    <>
      {isSideMenuOpen && <MobileNav closeSideMenu={closeSideMenu} />}
      <div className="hidden md:flex justify-end gap-4 transition-all ">
        {navItems().map((d, i) => (
          <div key={i} className="relative group px-2 py-1 transition-transform ease-out duration-500 ">
            <Link
              href={d.link ?? "#"}
              className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black "
            >
              <span>{d.label}</span>
              {d.children && (
                <IoIosArrowDown className=" rotate-180  transition-all group-hover:rotate-0" />
              )}
            </Link>

            {/* dropdown */}
            {d.children && (
              <div className="absolute right-0 top-7 hidden w-auto  flex-col gap-1 rounded-lg bg-white py-3 shadow-md  transition-all group-hover:flex ">
                {d.children.map((ch, i) => (
                  <Link
                    key={i}
                    href={ch.link ?? "#"}
                    className=" flex cursor-pointer items-center  py-1 pl-6 pr-8  text-neutral-400 hover:text-black  "
                  >
                    {/* item */}
                    <span className="whitespace-nowrap ">{ch.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <FiMenu
        onClick={openSideMenu}
        className="cursor-pointer text-4xl ml-auto md:hidden"
      />
    </>
  );
}

function MobileNav({ closeSideMenu }) {
  return (
    <div className="fixed left-0 top-0 flex h-full min-h-screen w-full justify-end bg-black/60 md:hidden ">
      <div className=" h-full w-[65%] bg-white px-4 py-4 transition-transform ease-out duration-500">
        <section className="flex justify-end">
          <AiOutlineClose
            onClick={closeSideMenu}
            className="cursor-pointer text-4xl "
          />
        </section>
        <div className=" flex flex-col text-base  gap-2 transition-all">
          {navItems().map((d, i) => (
            <SingleNavItem key={i} d={d}>
              {d.children}
            </SingleNavItem>
          ))}
        </div>

        {/* <section className="  flex  flex-col   gap-8  mt-4 items-center">
          <button className="h-fit text-neutral-400 transition-all hover:text-black/90">
            Login
          </button>

          <button className="w-full  max-w-[200px]  rounded-xl border-2 border-neutral-400 px-4 py-2 text-neutral-400 transition-all hover:border-black hover:text-black/90">
            Register
          </button>
        </section> */}
      </div>
    </div>
  );
}

function SingleNavItem({ d }) {
  const [animationParent] = useAutoAnimate();
  const [isItemOpen, setItem] = useState(false);

  function toggleItem() {
    return setItem(!isItemOpen);
  }

  return (
    <div
      ref={animationParent}
      onClick={toggleItem}
      className="relative   px-2 py-3 transition-all "
    >
      <Link
        href={d.link ?? "#"}
        className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black "
      >
        <span>{d.label}</span>
        {d.children && (
          // rotate-180
          <IoIosArrowDown
            className={`text-xs transition-all  ${isItemOpen && " rotate-180"}`}
          />
        )}
      </Link>

      {/* dropdown */}
      {isItemOpen && d.children && (
        <div className="  w-auto  flex-col gap-1   rounded-lg bg-white py-3   transition-all flexa ">
          {d.children.map((ch, i) => (
            <Link
              key={i}
              href={ch.link ?? "#"}
              className=" flex cursor-pointer items-center  py-1  pr-8  text-neutral-400 hover:text-black  "
            >
              {/* image */}
              {/* item */}
              <span className="whitespace-nowrap   pl-3 ">{ch.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
