import React from "react";
import "../css/about.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About This Project</h1>
      <p>
        This project is an advanced image processing tool that allows users to
        add watermarks to their images efficiently. It includes features like:
      </p>
      <ul>
        <li>Image Upload with Preview</li>
        <li>Customizable Watermark Text, Font Size, and Opacity</li>
        <li>Diagonal and Position-Based Watermark Options</li>
        <li>
          Fast Image Processing using <b>Sharp</b> library
        </li>
      </ul>

      <h2>About Me</h2>
      <p>
        I'm a passionate full-stack developer with expertise in React, Node.js,
        and MongoDB. I love building efficient and user-friendly web
        applications. If you have any questions or suggestions, feel free to
        reach out via the <b>Contact</b> link in the header.
      </p>
    </div>
  );
};

export default About;
