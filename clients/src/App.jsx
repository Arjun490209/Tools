import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from './pages/About'
import Contact from './pages/Contact'
import GradientGenerator from "./pages/GradientGenerator";
import {ToastContainer} from 'react-toastify'
import AvatarGenerator from "./pages/AvatarGenerator";
import ImageFinder from './pages/tools/ImageFinder'
import YoutubeThumbnailDownloader from "./pages/tools/YoutubeThumbnailDownloader";
import TaskPlanner from "./pages/tools/TaskPlanner";
import Chatbot from "./pages/tools/Chatbot";
import QrCodeGenerator from "./pages/tools/QrCodeGenerator";
import JsonGenerator from "./pages/tools/JsonGenerator";
import ExpenseTracker from "./pages/tools/ExpenseTracker";
import Projects from "./components/Projects";
const App = () => {
  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gradient-generator" element={<GradientGenerator />} />
        <Route path="/avatar-generator" element={<AvatarGenerator />} />
        <Route path="/image-finder" element={<ImageFinder />} />
        <Route path="/youtube-thumbnail-downloader" element={<YoutubeThumbnailDownloader />} />
        <Route path="/task-planner" element={<TaskPlanner />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/qr-code" element={<QrCodeGenerator />} />
        <Route path="/json-generator" element={<JsonGenerator />} />
        <Route path="/expense" element={<ExpenseTracker />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
