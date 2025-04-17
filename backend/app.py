from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from utils.predict import predict_disease

app = Flask(__name__)
CORS(app)  # 👈 Enable CORS for all routes

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image_file = request.files["image"]
    path = os.path.join(UPLOAD_FOLDER, image_file.filename)
    image_file.save(path)

    # Make sure you're passing the correct variable to predict_disease
    label, confidence, symptoms, treatment = predict_disease(path)

    return jsonify({
        "label": label,
        "confidence": confidence,
        "symptoms": symptoms,
        "treatment": treatment
    })

if __name__ == "__main__":
    app.run(port=5001, debug=True)
