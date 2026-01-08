import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import getYoutubeId from "get-youtube-id";
import { toast } from "react-toastify";

const urlModel = [
  {
    width: 120,
    height: 90,
    url: "https://img.youtube.com/vi",
    filename: "default.jpg",
  },
  {
    width: 320,
    height: 180,
    url: "https://img.youtube.com/vi",
    filename: "mqdefault.jpg",
  },
  {
    width: 480,
    height: 360,
    url: "https://img.youtube.com/vi",
    filename: "hqdefault.jpg",
  },
  {
    width: 640,
    height: 480,
    url: "https://img.youtube.com/vi",
    filename: "sddefault.jpg",
  },
  {
    width: 1280,
    height: 720,
    url: "https://img.youtube.com/vi",
    filename: "maxresdefault.jpg",
  },
];

const YoutubeThumbnailDownloader = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [thumbnail, setThumbnail] = useState([]);

  const fetchThumbnail = (e) => {
    e.preventDefault();
    const videoId = getYoutubeId(url);
    if (videoId) {
      const model = urlModel.map((item) => {
        return {
          ...item,
          url: `${item.url}/${videoId}/${item.filename}`,
        };
      });
      console.log(model);
      setThumbnail(model);
    } else {
      toast.error("Url i'd not found");
    }
  };

  const handleDownload = async (imageUrl, filename) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error(error.response.data.message || "Download failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 py-7">
      <div
        className="absolute top-2.5 lg:top-6 left-5 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <IoArrowBack className="w-6 h-6" />
      </div>
      <div className="w-full mx-auto flex justify-center">
        <h1 className=" text-[26px] font-bold">YouTube Thumbnail Download</h1>
      </div>
      <form
        className="w-full flex justify-center items-center gap-2 mt-8"
        onSubmit={fetchThumbnail}
      >
        <input
          type="text"
          onChange={(e) => setUrl(e.target.value)}
          value={url}
          required
          className="lg:w-2xs w-60 bg-white rounded-sm py-1.5 px-2.5 "
          placeholder="Paste url link"
        />
        <button className="py-1.5 px-2.5 bg-blue-600 text-white rounded-sm  font-semibold cursor-pointer hover:scale-105 transition-all duration-200">
          Search
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full lg:w-9/12 mx-auto mt-10 px-4">
        {thumbnail.length === 0 ? (
          <div className="col-span-full text-center text-gray-600 bg-white py-8 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold">
              📌 Please paste a YouTube video link and click Search
            </h2>
            <p className="text-sm mt-2 text-gray-500">
              Thumbnails will appear here after searching
            </p>
          </div>
        ) : (
          thumbnail.map((item, index) => (
            <div key={index} className="bg-white rounded-lg">
              <img
                src={item.url}
                alt=""
                className="w-full h-45 object-cover rounded-t-lg"
              />
              <div className="px-2 py-1.5 bg-white rounded-b-lg flex justify-between items-center">
                <h1 className="font-medium text-md">
                  {item.width}x{item.height}
                </h1>
                <button
                  onClick={() => handleDownload(item.url, item.filename)}
                  className="py-1 px-2.5 bg-green-600 text-white rounded-sm flex justify-center items-center font-semibold cursor-pointer hover:bg-green-500 transition-all duration-200"
                >
                  <MdOutlineFileDownload className="font-bold mr-1" />
                  Download
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default YoutubeThumbnailDownloader;
