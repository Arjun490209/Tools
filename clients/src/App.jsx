import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tools from './pages/Tools'
import About from './pages/About'
import Contact from './pages/Contact'
import GradientGenerator from "./pages/GradientGenerator";
import {ToastContainer} from 'react-toastify'
import AvatarGenerator from "./pages/AvatarGenerator";
import ImageFinder from './pages/tools/ImageFinder'
const App = () => {
  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gradient-generator" element={<GradientGenerator />} />
        <Route path="/avatar-generator" element={<AvatarGenerator />} />
        <Route path="/image-finder" element={<ImageFinder />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
