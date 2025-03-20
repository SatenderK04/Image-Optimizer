import { useState } from "react";
import axios from "axios";
import "../css/addWatermark.css";
import { PiUploadSimpleFill } from "react-icons/pi";
import BackButton from "./BackButton";
import { useDropzone } from "react-dropzone";

const AddWatermark = () => {
  const [file, setFile] = useState(null);
  const [watermark, setWatermark] = useState("");
  const [opacity, setOpacity] = useState(0.5);
  const [position, setPosition] = useState("southeast");
  const [fontWeight, setFontWeight] = useState(400);
  const [fontSize, setFontSize] = useState("medium"); // NEW: Font size state
  const [diagonal, setDiagonal] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file || !watermark) {
      alert("Please upload a file and enter a watermark text.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("watermark", watermark);
    formData.append("opacity", opacity);
    formData.append("position", position);
    formData.append("fontWeight", fontWeight);
    formData.append("fontSize", fontSize);
    formData.append("diagonal", diagonal);

    try {
      const response = await axios.post(
        "https://image-optimizer-server.onrender.com/watermark",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setDownloadUrl(
        `https://image-optimizer-server.onrender.com/image/download/watermark/${response.data.filename}`
      );
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BackButton />
      <h1 className="heading">Add Watermark</h1>
      <div className="container">
        <div className="upload-section">
          {!preview && (
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              <PiUploadSimpleFill className="upload-icon" />
              <p>Drag & Drop your image here or click to upload</p>
            </div>
          )}
          {preview && (
            <img src={preview} alt="Preview" className="image-preview" />
          )}
        </div>

        <div className="options-section">
          <div className="input-group">
            <label>Watermark Text</label>
            <input
              type="text"
              value={watermark}
              onChange={(e) => setWatermark(e.target.value)}
              placeholder="Enter watermark text"
            />
          </div>

          <div className="input-group">
            <label>Font Weight</label>
            <input
              type="number"
              value={fontWeight}
              onChange={(e) => setFontWeight(e.target.value)}
              min="100"
              max="900"
              step="100"
            />
          </div>

          {/* NEW: Font Size Selector */}
          <div className="input-group">
            <label>Font Size</label>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
            >
              <option value="xx-small">XX-Small</option>
              <option value="x-small">X-Small</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="x-large">X-Large</option>
              <option value="xx-large">XX-Large</option>
            </select>
          </div>
          {console.log(fontSize)}
          <div className="input-group">
            <label>Opacity: {opacity}</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={opacity}
              onChange={(e) => setOpacity(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Watermark Position</label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            >
              <option value="northwest">Top Left</option>
              <option value="northeast">Top Right</option>
              <option value="southwest">Bottom Left</option>
              <option value="southeast">Bottom Right</option>
              <option value="center">Center</option>
            </select>
          </div>

          <div className="input-group">
            <label className="checkbox-group">
              <input
                type="checkbox"
                checked={diagonal}
                onChange={(e) => setDiagonal(e.target.checked)}
              />
              Add Diagonal Watermark
            </label>
          </div>

          <button onClick={handleUpload} className="upload-button">
            {loading ? "Processing..." : "Upload & Add Watermark"}
          </button>

          {downloadUrl && (
            <div className="download-section">
              <p>Watermark added successfully!</p>
              <a href={downloadUrl} download>
                Download
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddWatermark;
