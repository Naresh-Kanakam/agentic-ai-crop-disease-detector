import random

# Mock class names
class_names = [
    "Tomato___Bacterial_spot", "Tomato___Early_blight", "Tomato___Late_blight",
    "Tomato___Leaf_Mold", "Tomato___Septoria_leaf_spot", "Tomato___Spider_mites",
    "Tomato___Target_Spot", "Tomato___Yellow_Leaf_Curl_Virus",
    "Tomato___mosaic_virus", "Tomato___healthy"
]

# Basic info map (you can expand it later)
info_map = {
    "Tomato___Bacterial_spot": {
        "symptoms": "Dark spots on leaves with yellow halos.",
        "treatment": "Use copper-based fungicides. Avoid overhead watering."
    },
    "Tomato___Early_blight": {
        "symptoms": "Dark concentric spots on lower leaves.",
        "treatment": "Remove affected leaves. Apply fungicide."
    },
    "Tomato___Late_blight": {
        "symptoms": "Brown lesions on leaves and stems.",
        "treatment": "Use resistant varieties. Apply fungicides."
    },
    "Tomato___healthy": {
        "symptoms": "No symptoms. Healthy plant.",
        "treatment": "No treatment needed."
    }
    # Add more details for other classes if you'd like
}

def predict_disease(img_path):
    label = random.choice(class_names)
    confidence = round(random.uniform(0.7, 0.99), 2)  # Confidence between 70% and 99%
    details = info_map.get(label, {"symptoms": "N/A", "treatment": "N/A"})
    return label, confidence, details["symptoms"], details["treatment"]
