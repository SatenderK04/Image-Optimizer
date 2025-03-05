import { useState } from "react";
import axios from "axios";

const AddWatermark = () => {
  const [file, setFile] = useState(null);
  const [watermark, setWatermark] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !watermark) {
      alert("Please upload a file and enter a watermark text.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("watermark", watermark);

    try {
      const response = await axios.post(
        "http://localhost:6767/image/watermark",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.status !== 200) {
        console.log("Error occured in adding watermark");
      }
      console.log(response.data);
      setDownloadUrl(
        `http://localhost:6767/image/download/${response.data.filename}`
      );
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Upload Image & Add Watermark</h1>
      <input
        type="file"
        name="image"
        onChange={handleFileChange}
        className="mb-4"
      />
      <input
        type="text"
        placeholder="Enter watermark text"
        value={watermark}
        onChange={(e) => setWatermark(e.target.value)}
        className="p-2 border border-gray-400 rounded mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Processing..." : "Upload & Add Watermark"}
      </button>
      {downloadUrl && (
        <div className="mt-4">
          <p className="text-green-600">Watermark added successfully!</p>
          <a
            href={downloadUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mt-2"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
};

export default AddWatermark;
