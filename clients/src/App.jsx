import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GradientGenerator from "./pages/GradientGenerator";
import {ToastContainer} from 'react-toastify'
import AvatarGenerator from "./pages/AvatarGenerator";
const App = () => {
  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gradient-generator" element={<GradientGenerator />} />
        <Route path="/avatar-generator" element={<AvatarGenerator />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
