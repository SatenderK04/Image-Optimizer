import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[100vh] w-[100vw] bg-gray-400 flex flex-col">
      <div class="container max-w-full h-[50vh] bg-gradient-to-r from-gray-300 to-gray-200 flex flex-col items-center justify-center text-center px-6 shadow-lg rounded-lg">
        <h1 class="font-bold text-4xl text-gray-800">
          🚀 Welcome to <span class="text-blue-600">ImageCompressor</span>!
        </h1>
        <p class="text-lg text-gray-700 max-w-2xl">
          Effortlessly upload and compress your images while maintaining high
          quality. Reduce file sizes for faster loading times and easy sharing.
        </p>
        <ul class="mt-1 space-y-2 text-gray-700 text-lg">
          <li class="flex items-center">
            <span class="text-green-600 text-2xl mr-2">✅</span> Upload and
            compress images instantly
          </li>
          <li class="flex items-center">
            <span class="text-green-600 text-2xl mr-2">✅</span> Maintain high
            quality with reduced file size
          </li>
          <li class="flex items-center">
            <span class="text-green-600 text-2xl mr-2">✅</span> Supports JPG,
            PNG, and more
          </li>
        </ul>
      </div>

      <div className="btn-container h-[50vh] w-[100%] ">
        <button
          onClick={() => {
            navigate("/compress");
          }}
          className="text-gray-900 border-2 border-red-400 bg-red-300 p-2.5 h-[3rem] w-[12rem] rounded-md font-semibold font-sans text-[1.25rem] cursor-pointer hover:bg-red-400 transition duration-[300ms] ease-in-out"
        >
          Compress
        </button>
        <button
          onClick={() => {
            navigate("/watermark");
          }}
          className="text-gray-900 border-2 border-blue-500 bg-blue-400 p-2.5 h-[3rem] w-[12rem] rounded-md font-semibold font-sans text-[1.25rem] cursor-pointer hover:bg-blue-500 transition duration-[300ms] ease-in-out"
        >
          Add Watermark
        </button>
        <button
          onClick={() => {
            navigate("/compress");
          }}
          className="text-gray-900 border-2 border-green-500 bg-green-400 p-2.5 h-[3rem] w-[12rem] rounded-md font-semibold font-sans text-[1.25rem] cursor-pointer hover:bg-green-500 transition duration-[300ms] ease-in-out"
        >
          Compress
        </button>
      </div>
    </div>
  );
};

export default Home;
