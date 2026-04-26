from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from tensorflow.keras.models import load_model
from PIL import Image
# from google.cloud import firestore  # Commented out for demo
import os

app = Flask(__name__)
CORS(app)

# -------------------------
# 🤖 Load Models
# -------------------------
heart_model = load_model("models/heart_model.keras")
xray_model = load_model("models/final_improved_model.keras")


# -------------------------
# 🧠 Helper (handle missing inputs)
# -------------------------
def get_value(data, key, default=0):
    return float(data[key]) if key in data else default


# -------------------------
# 🟦 Heart Prediction (Flexible Input)
# -------------------------
@app.route("/predict-heart", methods=["POST"])
def predict_heart():
    try:
        data = request.json

        # Always create 13 features
        features = [
            get_value(data, "age"),
            get_value(data, "sex"),
            get_value(data, "cp"),
            get_value(data, "trestbps"),
            get_value(data, "chol"),
            get_value(data, "fbs"),
            get_value(data, "restecg"),
            get_value(data, "thalach"),
            get_value(data, "exang"),
            get_value(data, "oldpeak"),
            get_value(data, "slope"),
            get_value(data, "ca"),
            get_value(data, "thal"),
        ]

        features = np.array([features])

        pred = heart_model.predict(features)
        confidence = float(pred[0][0])

        # ✅ Fix NaN properly
        if np.isnan(confidence):
            confidence = 0.0

        result = "High Risk" if confidence > 0.5 else "Low Risk"

        # Save to Firestore (commented out)
        # db.collection("heart_predictions").add({
        #     "input": data,
        #     "processed_features": features.tolist(),
        #     "prediction": result,
        #     "confidence": confidence,
        # })

        return jsonify({
            "prediction": result,
            "confidence": confidence
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------------
# 🟩 X-ray Prediction
# -------------------------
@app.route("/predict-xray", methods=["POST"])
def predict_xray():
    try:
        if "image" not in request.files:
            return jsonify({"error": "No image uploaded"}), 400

        file = request.files["image"]

        # Process image
        img = Image.open(file).convert("RGB").resize((224, 224))
        img = np.array(img) / 255.0
        img = np.expand_dims(img, axis=0)

        pred = xray_model.predict(img)
        confidence = float(pred[0][0])

        # 🔥 Use your best threshold
        result = "Pneumonia" if confidence > 0.65 else "Normal"

        # Save to Firestore (commented out)
        # db.collection("xray_predictions").add(
        #     {"prediction": result, "confidence": confidence}
        # )

        return jsonify({"prediction": result, "confidence": confidence})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------------
# 🧪 Test Route
# -------------------------
@app.route("/")
def home():
    return "Backend running (ML + Firestore commented out) ✅"


# -------------------------
# ▶ Run Server
# -------------------------
if __name__ == "__main__":
    app.run(debug=True)