import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <div className="w-full min-h-screen  pt-12 bg-linear-to-br from-black via-zinc-900 to-black text-white">
      <Navbar />
      <div className="min-h-screen w-full max-w-7xl mx-auto mt-8 mb-4">Contact</div>
      <Footer />
    </div>
  );
};

export default Contact;
