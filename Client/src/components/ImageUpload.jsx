import { useState } from "react";

const ImageUpload = ({ loading }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

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

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://localhost:4000/image/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      console.log("file uploaded", data);
      // onUpload(data);
    } catch (error) {
      console.error("Upload error:", error);
      alert("File upload failed. Please try again.");
    }
  };

  return (
    <>
      <div className="text-[2rem] uppercase font-semibold">
        Insert and compress the image
      </div>
      <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100 w-[60vw] h-[70vh] mx-auto">
        <form
          className="w-full h-[90%] flex flex-col items-center"
          onSubmit={handleSubmit}
        >
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
            className="cursor-pointer flex flex-col items-center justify-center w-full h-full bg-white rounded-lg shadow-sm hover:bg-gray-200 transition"
          >
            {selectedFile ? (
              <p className="text-sm text-gray-700">{selectedFile.name}</p>
            ) : (
              <>
                <p className="text-gray-600">Click to select an image</p>
                <p className="text-xs text-gray-400">
                  (JPG, PNG, GIF - Max 5MB)
                </p>
              </>
            )}
          </label>

          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="mt-4 w-32 h-32 object-cover rounded-lg shadow-md"
            />
          )}

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition disabled:bg-gray-400"
            onClick={(e) => {
              console.log("btn clicked");
            }}
            disabled={!selectedFile || loading}
          >
            {loading ? "Uploading..." : "Upload & Compress"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ImageUpload;
