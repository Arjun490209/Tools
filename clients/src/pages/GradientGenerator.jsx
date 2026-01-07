import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const GradientGenerator = () => {
  const navigate = useNavigate()
  const [num, setNum] = useState(12);
  const [type, setType] = useState("linear");
  const [gradients, setGradients] = useState([]);

  const haxCodeGenerate = () => {
    const rgb = 255 * 255 * 255;
    const random = Math.floor(Math.random() * rgb);
    const haxCode = random.toString(16);
    const colorHax = haxCode.padEnd(6, "0");
    return `#${colorHax}`;
  };

  const onCopy = (css) => {
    navigator.clipboard.writeText(css);
    toast.success("Gradient code copied!", { position: "top-center" });
  };

  const generateGradient = () => {
    const colors = [];
    for (let i = 0; i < num; i++) {
      const color1 = haxCodeGenerate();
      const color2 = haxCodeGenerate();
      const degree = Math.floor(Math.random() * 360);
      const degreeString = `${degree}deg`;
      if (type === "linear") {
        const gradient = `linear-gradient(${degreeString}, ${color1}, ${color2} )`;
        colors.push({
          gradient,
          css: `background: '${gradient}'`,
        });
      } else {
        const gradient = `radial-gradient(circle,${color1}, ${color2} )`;
        colors.push({
          gradient,
          css: `background:  '${gradient}'`,
        });
      }
    }
    setGradients(colors);
  };

  useEffect(() => {
    generateGradient();
  }, [num, type]);

  return (
    <div className="min-h-screen bg-gray-200 py-10">
      <div className="absolute top-6 left-5 cursor-pointer" onClick={()=>navigate('/')}>
        <IoArrowBack className="w-6 h-6"/>
      </div>
      <div className="w-9/12 mx-auto space-y-8">
      
        <div className="flex justify-between px-5 py-2 rounded-lg flex-col gap-5 lg:flex-row items-center" style={{background:haxCodeGenerate()}}>
          <div>
            <h1 className="text-lg  sm:text-3xl font-bold ">🎨 Gradient Generator </h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 ">
            <input
              type="number"
              onChange={(e) => setNum(e.target.value)}
              value={num}
              className="w-25 px-4 py-2 border border-green-400 outline-none focus:ring focus:ring-green-600 rounded-lg"
              placeholder="12"
            />
            <select
              name=""
              onChange={(e) => setType(e.target.value)}
              value={type}
              className="w-25 px-4 py-2 border border-green-400 outline-none focus:ring focus:ring-green-600 rounded-lg"
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>
            <button
              className="px-10 py-2 bg-rose-700 text-white font-medium rounded-sm"
              onClick={generateGradient}
            >
              Generate
            </button>
          </div>
        </div>
        <div className=" grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {gradients.map((item, index) => (
            <div
              key={index}
              className="h-40 rounded-lg relative"
              style={{ background: item.gradient }}
            >
              <button
                onClick={() => onCopy(item.css)}
                className=" absolute bottom-3 right-3 px-2 py-1 bg-black/50 hover:bg-black text-white uppercase rounded-sm text-[10px]"
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradientGenerator;
