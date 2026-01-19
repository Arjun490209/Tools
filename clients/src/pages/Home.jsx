import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import tools from "../data/tools";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className=" relative overflow-hidden w-full px-5  pt-20 bg-linear-to-br from-black via-zinc-900 to-black text-white">
      <div className=" absolute -top-20 -left-20 bg-red-600/30 blur-3xl w-96 h-96 "/>
      <div className=" absolute bottom-40 -right-20 bg-blue-600/20 blur-3xl w-96 h-96 "/>
      <Navbar />
      <h1 className="px-6 text-3xl font-semibold tracking-wide text-white">Tools </h1>
      <div className="grid grid-cols-1 w-full max-w-7xl mx-auto  sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr place-items-stretch mt-8 mb-4">
        {tools.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.slug}
              onClick={() => navigate(item.url)}
              className="group relative cursor-pointer rounded-2xl border border-gray-700 bg-linear-to-br from-slate-900 to-slate-800 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-linear-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 mb-4">
                <Icon className="text-2xl text-white" />
              </div>

              <h1 className="text-lg font-semibold text-white">
                {item.toolName}
              </h1>

              <p className="text-sm text-gray-400 leading-relaxed">
                {item.description}
              </p>

              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-linear-to-r from-indigo-500/10 to-purple-500/10" />
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
