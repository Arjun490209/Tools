import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { RiPaletteLine, RiUserSmileLine, RiImageLine,RiYoutubeLine  } from "react-icons/ri";




const tools = [
  {
    toolName: "Gradient Generator",
    slug: "gradient-generator",
    url: "/gradient-generator",
    description: "Create beautiful CSS gradients instantly.",
    icon: RiPaletteLine,
    status: "active",
  },
  {
    toolName: "Avatar Generator",
    slug: "avatar-generator",
    url: "/avatar-generator",
    description: "Generate unlimited avatars for your website or apps.",
    icon: RiUserSmileLine,
    status: "active",
  },
  {
    toolName: "Image Finder",
    slug: "image-finder",
    url: "/image-finder",
    description: "Image Finder helps you quickly find relevant, high-quality images.",
    icon: RiImageLine ,
    status: "active",
  },
  {
    toolName: "Yt Thumbnail Downloader",
    slug: "youtube-thumbnail-downloader",
    url: "/youtube-thumbnail-downloader",
    description: "Easily fetch and download YouTube video thumbnails in HD, SD, and original quality.",
    icon: RiYoutubeLine ,
    status: "active",
  },
];


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full md:w-9/12 mx-auto pt-20">
      <Navbar />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr place-items-stretch mt-8">
        {tools.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.slug}
              onClick={() => navigate(item.url)}
              className="group relative cursor-pointer rounded-2xl
              border border-gray-700 bg-gradient-to-br
              from-slate-900 to-slate-800 p-6
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-xl
              hover:shadow-indigo-500/20"
            >
              {/* Icon container */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center
                bg-gradient-to-r from-indigo-500 to-purple-600
                shadow-lg shadow-indigo-500/30 mb-4"
              >
                <Icon className="text-2xl text-white" />
              </div>

              <h1 className="text-lg font-semibold text-white">
                {item.toolName}
              </h1>

              <p className="text-sm text-gray-400 leading-relaxed">
                {item.description}
              </p>

              {/* Hover overlay */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0
                group-hover:opacity-100 transition
                bg-gradient-to-r from-indigo-500/10 to-purple-500/10"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default Home;
