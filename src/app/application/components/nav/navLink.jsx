import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import MyLinks from "./myLinks";

const navLinka = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

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
      {MyLinks().map((linkMenu, index) => (
        <div className="" key={index}>
          <div className="">
            <Link
              className={linkMenu.class}
              onClick={linkMenu.submenu === true ? handleNav : ""}
              href={linkMenu.link}
            >
              {linkMenu.name}
            </Link>
            {linkMenu.submenu && (
              <div>
                <div
                  ref={menuRef}
                  className={menuOpen ? "block absolute top-14" : "hidden"}
                >
                  <div className="py-3">
                    <div className="w-4 h-4 left-3 absolute mt-1 bg-white rotate-45"></div>
                  </div>
                  <div className="bg-white shadow-sm pr-20 pt-6 pl-6 pb-6">
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
    </>
  );
};

export default navLinka;
