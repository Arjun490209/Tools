import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../public/favicon.svg";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";

const menus = [
  { label: "Home", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50
    backdrop-blur-xl bg-slate-900/80
    border-b border-gray-700"
    >
      <div
        className="w-full max-w-7xl mx-auto
      h-16 px-4 flex items-center justify-between"
      >
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={logo} alt="Logo" className="h-9 w-9" />
          <span className="text-lg font-semibold text-white">AI Tools</span>
        </div>

        {/* Menu */}
        <ul className="hidden sm:flex  items-center gap-2 text-sm">
          {menus.map((item) => (
            <li
              key={item.path}
              onClick={() => navigate(item.path)}
              className="px-4 py-2 rounded-lg text-gray-300
              cursor-pointer transition
              hover:text-white hover:bg-white/10"
            >
              {item.label}
            </li>
          ))}
        </ul>
        <button onClick={() => setOpen(true)} className="sm:hidden text-white">
          <RxHamburgerMenu size={22} />
        </button>
        {/* mobile view */}

        {open && (
          <div className="absolute w-full px-6 top-0 left-0 transition-all bg-linear-to-br from-black via-zinc-900 to-black text-white/90 h-screen py-4 space-y-4">
            <div className="flex items-center justify-between w-full">
              <div
                onClick={() => navigate("/")}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img src={logo} alt="Logo" className="h-9 w-9" />
                <span className="text-lg font-semibold text-white">
                  AI Tools
                </span>
              </div>
              <div
                className="hover:text-gray-500 cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <RxCross2 size={22} />
              </div>
            </div>
            <ul className="flex flex-col gap-2 text-sm">
              {menus.map((item) => (
                <li
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="px-4 py-2 w-full bg-white/10 hover:bg-white/20 rounded-lg text-gray-300
              cursor-pointer transition
              hover:text-white"
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
