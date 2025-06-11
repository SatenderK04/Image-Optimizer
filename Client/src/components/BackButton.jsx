import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate("/");
  };
  return (
    <div className="back-btn" onClick={handleOnClick}>
      <FaArrowLeft className="arrow-icon" size={"2rem"} />
    </div>
  );
};

export default BackButton;
