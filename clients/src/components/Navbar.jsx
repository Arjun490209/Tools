import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../public/favicon.svg";

const menus = [
  { label: "Home", path: "/" },
  { label: "Tools", path: "/tools" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 right-0 z-50
    backdrop-blur-xl bg-slate-900/80
    border-b border-gray-700">
      
      <div className="w-full md:w-9/12 mx-auto
      h-16 px-4 flex items-center justify-between">
        
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={logo} alt="Logo" className="h-9 w-9" />
          <span className="text-lg font-semibold text-white">
            AI Tools
          </span>
        </div>

        {/* Menu */}
        <ul className="flex items-center gap-2 text-sm">
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
      </div>
    </div>
  );
};

export default Navbar;
