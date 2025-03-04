import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[100vh] w-[100vw] bg-gray-400 flex flex-col">
      <div class="container  max-w-full h-[50vh] bg-gray-300">
        <h1 className="font-semibold text-[2rem] my-1">
          Welcome to ImageCompressor!
        </h1>
        <p>
          Effortlessly upload and compress your images while maintaining
          quality. Reduce file sizes for faster loading times and easy sharing.
        </p>
        <ul>
          <li>✅ Upload and compress images instantly</li>
          <li>✅ Maintain high quality with reduced file size</li>
          <li>✅ Supports JPG, PNG, and more</li>
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
