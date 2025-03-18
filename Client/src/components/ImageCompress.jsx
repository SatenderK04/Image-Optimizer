import { useState } from "react";
import axios from "axios";
import "../css/imageCompress.css"; // Import the CSS file
import BackButton from "./BackButton";

const ImageCompress = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (file) => {
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:8787/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status !== 200) throw new Error("Upload failed");

      console.log("File uploaded", response.data);
      setDownloadUrl(
        `http://localhost:8787/image/download/compressed/${response.data.filename}`
      );
    } catch (error) {
      console.error("Upload error:", error);
      alert("File upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BackButton />
      <h2 className="heading">Compress image</h2>
      <div
        className="image-compress-container"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="image-compress-box">
          <h2 className="image-compress-title">Image Compression Tool</h2>
          <p className="image-compress-description">
            Upload an image to compress and download it.
          </p>

          <form onSubmit={handleSubmit} className="image-compress-form">
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e.target.files[0])}
              className="hidden"
              id="fileUpload"
            />
            <label htmlFor="fileUpload" className="file-upload-label">
              {selectedFile ? (
                <p className="file-upload-text">{selectedFile.name}</p>
              ) : (
                <>
                  <p className="file-upload-text">
                    Drag & Drop or Click to Select an Image
                  </p>
                  <p className="file-upload-hint">(JPG, PNG - Max 5MB)</p>
                </>
              )}
            </label>

            {previewUrl && (
              <img src={previewUrl} alt="Preview" className="image-preview" />
            )}

            <button
              type="submit"
              className="upload-button"
              disabled={!selectedFile || loading}
            >
              {loading ? "Uploading..." : "Upload & Compress"}
            </button>
          </form>

          {downloadUrl && (
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="download-button"
            >
              Download
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageCompress;
