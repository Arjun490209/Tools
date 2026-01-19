import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate =useNavigate()
  return (
    <div className="w-full border-t border-gray-600 bg-linear-to-br from-black via-zinc-900 to-black text-white/90 px-6 py-6">
      <div className="w-full mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Column 1: About */}
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold hover:text-blue-600 transition">
            Arjun Prajapati — MERN Stack Developer
          </h1>

          <p className="text-gray-400 text-sm">
            MERN Stack Developer building scalable full-stack web applications
            with modern UI and secure backend APIs.
          </p>

          <a
            href="https://portfolio-gna1.onrender.com/"
            target="_blank"
            className="text-blue-500 text-sm font-medium hover:underline"
          >
            View Portfolio →
          </a>
        </div>

        {/* Column 2: Tech Stack */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Tech Stack</h2>

          <p className="text-sm text-gray-400">
            MongoDB · Express · React · Node · Next.js · Tailwind · Socket.io
          </p>

          <div
            onClick={()=>navigate("/products")}
            className="hover:text-blue-500 text-blue-400 hover:underline cursor-pointer"
          >
            View Project →
          </div>
        </div>

        {/* Column 3: Connect */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Connect</h2>

          <ul className="text-sm text-gray-400 space-y-1">
            <li>
              <a
                href="mailto:arjun.prajapati.stack@gmail.com"
                className="hover:text-blue-500"
              >
                arjun.prajapati.stack@gmail.com
              </a>
            </li>

            <li>
              <a
                href="https://www.linkedin.com/in/arjun-prajapati-6452013a3"
                target="_blank"
                className="hover:text-blue-500"
              >
                LinkedIn
              </a>
            </li>

            <li>
              <a
                href="https://github.com/Arjun490209"
                target="_blank"
                className="hover:text-blue-500"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <p className="text-xs text-center text-gray-500 mt-6">
        © 2026 Arjun Prajapati | Built with MERN Stack
      </p>
    </div>
  );
};

export default Footer;
