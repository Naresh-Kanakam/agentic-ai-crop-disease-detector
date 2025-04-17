import React, { useState } from "react";
import axios from "axios";

const Home: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setError("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post("http://localhost:5001/predict", formData);
      const prediction = response.data;
      setResult(prediction);
      setHistory((prev) => [prediction, ...prev]);
    } catch (err) {
      console.error(err);
      setError("Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Tomato Leaf Disease Detection 🍅</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />

      {preview && (
        <div className="mb-4">
          <img
            src={preview}
            alt="Preview"
            className="w-full max-h-80 object-contain rounded border"
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition mb-4"
        disabled={loading}
      >
        {loading ? "Predicting..." : "Predict"}
      </button>

      {error && (
        <div className="text-red-600 font-medium mb-4">{error}</div>
      )}

      {result && (
        <div className="bg-white border rounded shadow p-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Prediction Result</h3>
          <p><strong>Disease:</strong> {result.label}</p>
          <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%</p>
          <p><strong>Symptoms:</strong> {result.symptoms}</p>
          <p><strong>Treatment:</strong> {result.treatment}</p>
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Prediction History</h4>
          <ul className="space-y-2 max-h-64 overflow-auto text-sm">
            {history.map((item, idx) => (
              <li key={idx} className="bg-white border p-3 rounded shadow">
                <strong>{item.label}</strong> – {Math.round(item.confidence * 100)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
