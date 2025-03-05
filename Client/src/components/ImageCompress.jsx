import { useState } from "react";
import axios from "axios";

const ImageCompress = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:6767/image/upload",
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
        `http://localhost:6767/image/download/${response.data.filename}`
      );
    } catch (error) {
      console.error("Upload error:", error);
      alert("File upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">
          Image Compression Tool
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Upload an image to compress and download it.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="fileUpload"
          />
          <label
            htmlFor="fileUpload"
            className="cursor-pointer flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition p-4"
          >
            {selectedFile ? (
              <p className="text-gray-700">{selectedFile.name}</p>
            ) : (
              <>
                <p className="text-gray-600">Click to select an image</p>
                <p className="text-xs text-gray-400">(JPG, PNG - Max 5MB)</p>
              </>
            )}
          </label>

          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="mt-4 w-40 h-40 object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
            />
          )}

          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
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
            className="mt-4 w-full block text-center bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Download
          </a>
        )}
      </div>
    </div>
  );
};

export default ImageCompress;
