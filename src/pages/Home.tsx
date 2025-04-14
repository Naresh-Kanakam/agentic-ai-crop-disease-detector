import React, { useState } from "react";

const Home = () => {
  const [image, setImage] = useState<File | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    console.log("Uploading image: ", image);
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          Crop Disease Detector
        </h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="mb-4 w-full border border-gray-300 rounded px-3 py-2"
        />
        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-2 py-2 rounded w-full">
          Detect
        </button>

        {/* Display the selected file name if an image is selected */}

        {image && (
          <p className="mt-4 text-sm text-gray-600">
            Selected File: <span className="font-medium"> {image.name} </span>
          </p>
        )}

        {/* Display the image preview if an image is selected */}
        {/* {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="mt-4 w-full rounded"
            style={{ maxHeight: "300px", objectFit: "cover" }}
          />
        )} */}
      </div>
    </div>
  );
};

export default Home;
