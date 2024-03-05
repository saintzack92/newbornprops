import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import MyLinks from "./myLinks";
import {
  MdChevronLeft,
  MdChevronRight,
  MdOutlineMenu,
  MdClose,
} from "react-icons/md";
import Image from "next/image";
import LogoVPN from "../../../../../public/assets/img/Logo.svg";

const navLinka = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [menuOpen, setMenuOpen] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const menuRef = useRef();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // Klik dilakukan di luar menu, set menuOpen ke false
        setMenuOpen(false);
      }
    };

    // Menambahkan event listener ketika komponen dimount
    document.addEventListener("mousedown", handleClickOutside);

    // Membersihkan event listener ketika komponen diunmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNav = () => {
    // Toggle menuOpen
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <ul className="hidden lg:flex md:flex col-start-4 col-end-8 text-black  justify-end">
        {MyLinks().map((linkMenu, index) => (
          <div className="" ref={menuRef} key={index}>
            <div className="">
              <Link
                className={linkMenu.class}
                onClick={linkMenu.submenu === true ? handleNav : ""}
                href={linkMenu.link}
              >
                {linkMenu.name}
                {linkMenu.submenu === true ? (
                  <span className="ml-2">
                    {menuOpen ? (
                      <MdChevronRight size={22} className="rotate-90" />
                    ) : (
                      <MdChevronLeft size={22} className="rotate-90 " />
                    )}
                  </span>
                ) : (
                  ""
                )}
              </Link>{" "}
              {linkMenu.submenu && (
                <div>
                  <div
                    // ref={menuRef}
                    className={menuOpen ? "block absolute top-14" : "hidden"}
                  >
                    <div className="py-3">
                      <div className="w-4 h-4 left-3 absolute mt-1 bg-white rotate-45"></div>
                    </div>
                    <div className="bg-white shadow-sm pr-16 pt-6 pl-6 pb-3">
                      {linkMenu.sublinks.map((mysublinks, indexs) => (
                        <div key={indexs}>
                          {mysublinks.sublink.map((slink, indexss) => (
                            <div
                              className="pb-3 text-black border-transparent  hover:text-orange-500 transition-all "
                              key={indexss}
                            >
                              <Link
                                className=""
                                onClick={() => setMenuOpen(false)}
                                href={slink.link}
                              >
                                {slink.name}
                              </Link>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </ul>

      <div
        onClick={handleNav}
        className="lg:hidden md:hidden flex justify-end cursor-pointer "
      >
        {menuOpen ? "" : <MdOutlineMenu size={22} />}

        <div
          className={
            menuOpen
              ? "fixed left-0 top-0 w-[65%] sm:hidden h-screen bg-[#ecf0f3] shadow p-7 ease-in duration-500"
              : "fixed left-[-100%] top-0 p-7 ease-in duration-500 h-screen bg-[#ecf0f3]"
          }
        >
          <div
            onClick={handleNav}
            className=" flex  w-full  justify-between cursor-pointer "
          >
            <Link href={`/`}>
              <div className="cursor-pointer ">
                <Image src={LogoVPN} className="h-6 w-auto" alt="foto" />
              </div>
            </Link>
            <MdClose size={22} />
          </div>

          <div className="flex-col py-4 pt-6">
            <ul>

            </ul>
        </div>
        </div>
      </div>
    </>
  );
};

export default navLinka;
