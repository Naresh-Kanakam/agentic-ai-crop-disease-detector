import React, { useState } from "react";
import { uploadImage } from "../services/uploadService";

const Home: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      setUploadMessage("⚠️ Please select an image.");
      return;
    }

    try {
      const res = await uploadImage(selectedImage);
      setUploadMessage("✅ Uploaded: " + res.filename);
    } catch (error) {
      console.error("Upload failed", error);
      setUploadMessage("❌ Upload failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 px-4">
      <h1 className="text-3xl font-bold mb-6 text-green-800">🌾 Crop Disease Detector</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />

      {previewUrl && (
        <img src={previewUrl} alt="Preview" className="w-64 h-auto mb-4 rounded shadow-md" />
      )}

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Submit Image
      </button>

      {uploadMessage && (
        <p className="mt-4 text-green-800 font-semibold">{uploadMessage}</p>
      )}
    </div>
  );
};

export default Home;
