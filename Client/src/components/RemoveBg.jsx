import { useState } from "react";
import axios from "axios";
import { PiUploadSimpleFill } from "react-icons/pi";
import "../css/removeBg.css";
import BackButton from "./BackButton";

const RemoveBg = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (file) => {
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please upload an image first!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:8787/image/removebg",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const imageUrl = `http://localhost:8787/image/download/removebg/${response.data.filename}`;
      setProcessedImage(imageUrl);
    } catch (error) {
      console.error("Error removing background:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BackButton />
      <h2 className="heading">Remove Image Background</h2>
      <div
        className={`remove-bg-container ${dragActive ? "drag-active" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!preview && (
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e.target.files[0])}
              className="hidden"
              id="fileUpload"
            />
            <label htmlFor="fileUpload" className="file-upload-label-s">
              <PiUploadSimpleFill className="upload-icon" />
              <p className="upload-text">
                {dragActive ? "Drop here!" : "Upload an image or drag & drop"}
              </p>
            </label>
          </div>
        )}

        {preview && (
          <img src={preview} alt="Uploaded" className="image-preview" />
        )}

        {processedImage && (
          <div className="processed-section">
            <h3>Background Removed!</h3>
            <img
              src={processedImage}
              alt="Processed"
              className="image-preview"
            />
            <a
              href={processedImage}
              download="bg_removed.png"
              className="download-link"
            >
              Download Image
            </a>
          </div>
        )}

        <button
          onClick={handleUpload}
          className="button"
          disabled={loading || !image || processedImage}
        >
          {loading ? <div className="loader"></div> : "Remove Background"}
        </button>
      </div>
    </>
  );
};

export default RemoveBg;
