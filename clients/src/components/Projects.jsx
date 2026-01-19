import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Projects = () => {
  return (
    <div className="w-full min-h-screen  pt-12 bg-linear-to-br from-black via-zinc-900 to-black text-white">
      <Navbar />
      <div className="grid min-h-screen grid-cols-1 border w-full max-w-7xl mx-auto  sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr place-items-stretch mt-8 mb-4">Project</div>

      <Footer/>
    </div>
  );
};

export default Projects;
