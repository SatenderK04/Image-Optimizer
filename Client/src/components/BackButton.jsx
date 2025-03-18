import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate("/");
  };
  return (
    <div className="back-button" onClick={handleOnClick}>
      <FaArrowLeft className="arrow-icon" />
    </div>
  );
};

export default BackButton;
