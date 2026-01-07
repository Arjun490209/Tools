import React, { useEffect, useState } from "react";
import avatar from "../assets/avatar.png";
import "remixicon/fonts/remixicon.css";
import "animate.css";
import { IoArrowBack } from "react-icons/io5";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const data = [
  {
    label: "Illustration",
    value: "illustration",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=",
  },
  {
    label: "Cartoon",
    value: "cartoon",
    url: "https://api.dicebear.com/7.x/adventurer/svg?seed=s",
  },
  {
    label: "Sketchy",
    value: "sketchy",
    url: "https://api.dicebear.com/7.x/croodles/svg?seed=",
  },
  {
    label: "Robots",
    value: "robots",
    url: "https://api.dicebear.com/7.x/bottts/svg?seed=",
  },
  {
    label: "Art",
    value: "art",
    url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=",
  },
  {
    label: "Male",
    value: "male",
    url: "https://randomuser.me/api/portraits/men",
  },
  {
    label: "Female",
    value: "female",
    url: "https://randomuser.me/api/portraits/women",
  },
];

const AvatarGenerator = () => {
  
  const navigate = useNavigate()
  const [src, setSrc] = useState(null);
  const [option, setOption] = useState("male");

  const generateNumPerson = () => {
    const imgId = Math.floor(Math.random() * 99);
    return imgId;
  };

  const download = (url) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `${Date.now()}.jpg`;
    a.click();
    a.remove();
  };

  const onCopy = (url) => {
    navigator.clipboard.writeText(url);
    toast.success("Url Copied");
  };

  const generate = () => {
    const obj = data.find((item) => item.value === option);
    const url = obj.url;
    if (option === "male" || option === "female") {
      const imageUrl = `${url}/${generateNumPerson()}.jpg`;
      setSrc(imageUrl);
    } else {
      const uniqueValue = Date.now();
      const image = `${url}+${uniqueValue}`;
      setSrc(image);
    }
  };

  useEffect(() => {
    generate();
  }, [option]);

  return (
    <div className="animate__animated animate__fadeIn min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 flex justify-center items-center text-white">

      <div className="absolute top-6 left-5 cursor-pointer" onClick={()=>navigate('/')}>
        <IoArrowBack className="w-6 h-6"/>
      </div>
      <div className="animate__animated animate__bounceIn w-full max-w-md rounded-2xl shadow-xl backdrop-blur-xl border border-slate-600 p-10 flex flex-col items-center gap-4">
        <img
          src={src || avatar}
          alt=""
          className="w-32 h-32 rounded-full border-4 border-slate-700 shadow-lg object-cover"
        />
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-wide">Avatar Generator</h1>
          <p className="text-slate-300">
            Avatar unlimited avatars for your website.
          </p>
        </div>
        <div className="w-full space-y-2">
          <select
            name=""
            id=""
            onChange={(e) => setOption(e.target.value)}
            value={option}
            className="bg-slate-900 w-full p-3 rounded-full"
          >
            {data.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <div className="bg-slate-900 w-full p-5 rounded-full">{src}</div>
        </div>
        <div className="w-full flex gap-3">
          <button
            className="flex-1 bg-gradient-to-r from-rose-500 to-orange-600 font-medium rounded-lg py-2 hover:scale-105 transition-transform duration-50 cursor-pointer"
            onClick={generate}
          >
            <i className="ri-arrow-right-up-line mr-1"></i> Generate
          </button>
          <button
            onClick={() => download(src)}
            className="flex-1 bg-gradient-to-r from-green-500 to-cyan-600 font-medium rounded-lg py-2 hover:scale-105 transition-transform duration-50 cursor-pointer"
          >
            <i className="ri-download-line mr-1"></i> Download
          </button>
          <button
            onClick={() => onCopy(src)}
            className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 font-medium rounded-lg py-2 hover:scale-105 transition-transform duration-50 cursor-pointer"
          >
            <i className="ri-file-copy-line mr-1"></i> Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarGenerator;
