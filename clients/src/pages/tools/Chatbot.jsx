import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSendSharp } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import "animate.css";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";

// const API_KEY = import.meta.env.GEMINI_API_KEY;
const API_KEY = "AIzaSyA5_1ZkIVeNUGGK2jOymu3QTALsS2e6Ls4";
const Chatbot = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const createChat = async (e) => {
    e.preventDefault();

    const userMessage = message.trim();
    if (!userMessage) return;

    try {
      setChat((prev) => [
        ...prev,
        {
          sender: "me",
          message: userMessage,
          createAt: new Date(),
        },
      ]);

      setMessage("");
      setIsTyping(true);

      const payload = {
        contents: [
          {
            parts: [{ text: `Answer this in short - ${userMessage}` }],
          },
        ],
      };

      const { data } = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": API_KEY,
          },
        }
      );

      const aiMessage =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

      setChat((prev) => [
        ...prev,
        {
          sender: "ai",
          message: aiMessage,
          createAt: new Date(),
        },
      ]);
    } catch (error) {
      console.error(error.response?.data || error);
      toast.error("Gemini API failed");
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="bg-gray-200 min-h-screen">
      <div
        className="absolute top-2.5 lg:top-6 left-5 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <IoArrowBack className="w-6 h-6" />
      </div>
      <div className="lg:w-9/12 w-full mx-auto bg-white min-h-screen pt-10 pb-20">
        <h1 className="text-lg md:text-xl font-bold text-center text-indigo-600 mb-6">
          AI Assistant
        </h1>

        <div className="p-8 space-y-4">
          {chat.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center text-gray-400 mt-20">
              <div className="text-4xl mb-2">💬</div>
              <p className="text-lg font-medium">Start a conversation</p>
              <p className="text-sm">Ask me anything and I’ll help you.</p>
            </div>
          )}

          {chat.map((item, index) => (
            <div key={index}>
              {item.sender === "me" && (
                <div className="flex flex-col gap-2 items-start animate__animated animate__fadeIn">
                  <div className="bg-red-200 text-rose-500 font-medium px-6 py-2 space-y-1.5 rounded-sm w-9/12 md:w-1/2">
                    {item.message}
                    <div className="flex justify-end text-gray-500 text-xs ">
                      <label>
                        {moment(item.createAt).format(
                          "DD MMM YYYY, hh:mm:ss A"
                        )}
                      </label>
                      <div ref={chatEndRef}></div>
                    </div>
                  </div>
                </div>
              )}

              {item.sender === "ai" && (
                <div className="flex flex-col gap-2 items-end animate__animated animate__fadeIn">
                  <div className="bg-green-200 text-green-500 font-medium px-6 space-y-1.5 py-2 rounded-sm w-9/12">
                    {item.message}
                    <div className="flex justify-end text-gray-500 text-xs ">
                      <label htmlFor="">
                        {moment(item.createAt).format(
                          "DD MMM YYYY, hh:mm:ss A"
                        )}
                      </label>
                      <div ref={chatEndRef}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end px-5">
          {isTyping && (
            <small className="text-gray-500 text-sm animate__animated animate__fadeIn">
              Typing...
            </small>
          )}
          <div ref={chatEndRef}></div>
        </div>

        <div className="fixed bottom-0 left-0 w-full bg-white z-50 border-t-2 border-indigo-200">
          <div className="w-full max-w-5xl mx-auto px-3 py-3">
            <form onSubmit={createChat} className="flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                className="flex-1 border border-gray-300 rounded-full px-4 py-2.5 text-sm sm:text-base outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-full transition"
              >
                <IoSendSharp className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
