// Later, replace this with real model inference (TensorFlow, PyTorch, etc.)
export const predictDisease = (filename: string): string => {
    // Fake prediction based on filename
    if (filename.toLowerCase().includes("leaf")) return "Powdery Mildew";
    if (filename.toLowerCase().includes("spot")) return "Leaf Spot";
    return "Healthy";
  };
  