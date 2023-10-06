import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

const Header = () => {
  const [isScrolling, setScrolling] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrolling(window.scrollY > 0);
    });

    return () => {
      window.removeEventListener("scroll", () => {
        setScrolling(window.scrollY > 0);
      });
    };
  }, []);

  const navClass = `navbar fixed z-50 w-full top-0 lg:px-16 ${
    isScrolling
      ? "bg-white z-50 drop-shadow-lg"
      : "bg-gradient-to-r from-blue-600 to-teal-400 text-white"
  }`;

  return (
    <div className={`navbar ${navClass} text-black`}>
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="z-50 p-2 mt-3 bg-white shadow-md menu menu-sm dropdown-content rounded-box w-52"
          >
            <li>
              <Link>Home</Link>
            </li>
            <li>
              <Link>Company Profile</Link>
            </li>
            <li>
              <Link>Parent</Link>
              <ul className="p-2">
                <li>
                  <Link>Submenu 1</Link>
                </li>
                <li>
                  <Link>Submenu 2</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link>Item 3</Link>
            </li>
          </ul>
        </div>
        <Link className="text-xl normal-case btn btn-ghost">daisyUI</Link>
      </div>
      <div className="hidden navbar-center lg:flex">
        <ul className="px-1 menu menu-horizontal">
          <li>
            <Link>Home</Link>
          </li>{" "}
          <li>
            <Link>Company Profile</Link>
          </li>
          <li>
            <Link>Products</Link>
          </li>
          <li>
            <Link>Our Concern</Link>
          </li>
          <li tabIndex={0}>
            <details>
              <summary>Parent</summary>
              <ul className="p-2 bg-white shadow-md">
                <li>
                  <Link>Submenu 1</Link>
                </li>
                <li>
                  <Link>Submenu 2</Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link>Item 3</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Button>Hubungi Kami</Button>
      </div>
    </div>
  );
};

export default Header;
