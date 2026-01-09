import "animate.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import { MdOutlineFileDownload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

const ImageFinder = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("people");

  const fetchImage = async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=12`,
        {
          headers: { Authorization: API_KEY },
        }
      );

      setPhotos((prev) => [...prev, ...result.data.photos]);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Image loading failed");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async (url, filename = "image.jpg") => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  const loadMore = () => {
    if (!loading) setPage((prev) => prev + 1);
  };

  const search = (e) => {
    e.preventDefault();
    const value = e.target[0].value.trim();

    if (!value) return toast.warning("Please enter a search term");

    setPhotos([]);
    setPage(1);
    setQuery(value);
  };

  useEffect(() => {
    fetchImage();
  }, [page, query]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8 gap-5 animate__animated animate__fadeIn">
      <h1 className="text-3xl font-bold text-indigo-600">📸Image Gallery</h1>
      <div
        className="absolute top-6 left-5 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <IoArrowBack className="w-6 h-6" />
      </div>
      <form action="" onSubmit={search} className="">
        <input
          type="text"
          className="p-3 rounded-l-xl bg-white w-75 outline focus:outline-indigo-600"
          placeholder="Search image here..."
        />
        <button className="bg-gradient-to-br from-indigo-600 via-blue-400 to-indigo-600 p-3 w-30 rounded-r-xl font-semibold text-white hover:scale-105 transition-all duration-200 cursor-pointer">
          Search
        </button>
      </form>

      <div className="w-9/12">
        {photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-300">
              😕 No Results Found
            </h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {photos.map((item, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden">
                <img
                  src={item.src.medium}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-50 object-cover hover:scale-110 transition-all duration-300"
                />

                <div className="p-3">
                  <h1 className="text-xl font-medium truncate">
                    {item.photographer}
                  </h1>

                  <button
                    disabled={loadingId === item.id}
                    onClick={async () => {
                      setLoadingId(item.id);
                      await downloadImage(
                        item.src.original,
                        `photo-${item.id}.jpg`
                      );
                      setLoadingId(null);
                    }}
                    className={`w-full py-2 mt-2 flex justify-center items-center rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg gap-1.5 ${
                      loadingId === item.id
                        ? "opacity-70 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <MdOutlineFileDownload className="w-5 h-5" />
                    {loadingId === item.id ? "Downloading..." : "Download"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {loading && <HashLoader size={22} color="gray" />}

      <button
        disabled={loading}
        onClick={loadMore}
        className={`bg-rose-500 py-3 w-70 rounded-lg font-medium text-white transition-all duration-200 
  ${
    loading ? "opacity-60 cursor-not-allowed" : "hover:scale-105 cursor-pointer"
  }`}
      >
        {loading ? "Loading..." : "Load more"}
      </button>
    </div>
  );
};

export default ImageFinder;
