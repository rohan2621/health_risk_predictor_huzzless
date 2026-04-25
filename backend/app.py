from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from tensorflow.keras.models import load_model
from PIL import Image

app = Flask(__name__)
CORS(app)

# Load models
heart_model = load_model("heart_disease.h5")
xray_model = load_model("x_ray.h5")

# -------------------------
# 🟦 Heart Prediction
# -------------------------
@app.route('/predict-heart', methods=['POST'])
def predict_heart():
    data = request.json

    features = [
        data["age"],
        data["restingBP"],
        data["cholesterol"]
    ]

    features = np.array([features])
    pred = heart_model.predict(features)

    result = "High Risk" if pred[0][0] > 0.5 else "Low Risk"

    return jsonify({
        "prediction": result,
        "confidence": float(pred[0][0])
    })


# -------------------------
# 🟩 X-ray Prediction
# -------------------------
@app.route('/predict-xray', methods=['POST'])
def predict_xray():
    file = request.files['image']

    img = Image.open(file).resize((224, 224))
    img = np.array(img) / 255.0
    img = np.expand_dims(img, axis=0)

    pred = xray_model.predict(img)
    result = "Pneumonia" if pred[0][0] > 0.5 else "Normal"

    return jsonify({
        "prediction": result,
        "confidence": float(pred[0][0])
    })


# Run server
if __name__ == '__main__':
    app.run(debug=True)