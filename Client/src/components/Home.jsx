import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/home.css";
import Header from "./Header";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="home-container">
        <Header />
        <div className="content-container">
          <h1 className="title">
            🚀 Welcome to <span className="highlight">Image Optimiser</span>!
          </h1>
          <p className="description">
            Compress images, add custom watermarks, and remove backgrounds — all
            in one powerful tool! Enhance your workflow with faster loading
            times and improved visual presentation.
          </p>
          <ul className="features-list">
            <li>
              <span className="checkmark">✅</span> Compress images efficiently
              with minimal quality loss
            </li>
            <li>
              <span className="checkmark">✅</span> Add customizable watermarks
              to protect your content
            </li>
            <li>
              <span className="checkmark">✅</span> Easily remove image
              backgrounds in seconds
            </li>
            <li>
              <span className="checkmark">✅</span> Supports JPG, PNG, and more
            </li>
          </ul>
        </div>

        <div className="btn-container">
          <button
            onClick={() => navigate("/compress")}
            className="btn compress-btn"
          >
            Compress
          </button>
          <button
            onClick={() => navigate("/watermark")}
            className="btn watermark-btn"
          >
            Add Watermark
          </button>
          <button
            onClick={() => navigate("/removebg")}
            className="btn removebg-btn"
          >
            Remove Bg
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
