from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from PIL import Image
from google.cloud import firestore
from io import BytesIO
import os
import joblib

app = Flask(__name__)
CORS(app)

# -------------------------
# 🔐 Firebase Setup (optional)
# -------------------------
try:
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "phenomenia-detectator.json"
    db = firestore.Client()
    FIREBASE_OK = True
    print("✅ Firestore connected")
except Exception as e:
    print("⚠️ Firestore disabled:", e)
    FIREBASE_OK = False

# -------------------------
# ⚙️ Config
# -------------------------
IMG_SIZE = 128

# -------------------------
# 🔥 KERAS FIX (IMPORTANT)
# -------------------------
import keras
from keras.layers import Dense

original_init = Dense.__init__

def new_init(self, *args, **kwargs):
    kwargs.pop("quantization_config", None)
    return original_init(self, *args, **kwargs)

Dense.__init__ = new_init

# -------------------------
# 📁 PATH SETUP (FIXED)
# -------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "models")

print("📁 Base Dir:", BASE_DIR)
print("📁 Model Dir:", MODEL_DIR)

# -------------------------
# 🤖 Load Models
# -------------------------

# ❤️ Heart Model (XGBoost)
heart_model = None
try:
    heart_path = os.path.join(MODEL_DIR, "heart_model.pkl")
    print("🔍 Loading heart model from:", heart_path)

    if not os.path.exists(heart_path):
        raise FileNotFoundError("heart_model.pkl not found")

    heart_model = joblib.load(heart_path)
    print("✅ Heart model loaded successfully")

except Exception as e:
    print("❌ Heart model load error:", e)

# 🫁 X-ray Model (Keras)
def load_keras_model(path):
    try:
        model = tf.keras.models.load_model(path, compile=False)
        print(f"✅ Loaded model: {path}")
        return model
    except Exception as e:
        print(f"❌ Failed to load {path}: {e}")
        return None

xray_model = load_keras_model(os.path.join(MODEL_DIR, "my_model.keras"))

print("🚀 Server Ready")

# -------------------------
# 🧠 Helper
# -------------------------
def get_value(data, key, default=0):
    try:
        return float(data.get(key, default))
    except:
        return default

# -------------------------
# ❤️ Heart Prediction
# -------------------------
@app.route("/predict-heart", methods=["POST"])
def predict_heart():
    try:
        if heart_model is None:
            return jsonify({
                "error": "Heart model not loaded",
                "debug": "Check backend terminal for path issue"
            }), 500

        data = request.json

        features = np.array([[
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
        ]])

        print("🧠 INPUT:", features)

        prob = heart_model.predict_proba(features)[0][1]

        print("🧪 PROBABILITY:", prob)

        if prob < 0.35:
            result = "Low Risk"
        elif prob < 0.65:
            result = "Medium Risk"
        else:
            result = "High Risk"

        if FIREBASE_OK:
            try:
                db.collection("heart_predictions").add({
                    "input": data,
                    "prediction": result,
                    "confidence": float(prob)
                })
            except Exception as e:
                print("⚠️ Firestore error:", e)

        return jsonify({
            "prediction": result,
            "confidence": float(prob)
        })

    except Exception as e:
        print("❌ Heart Error:", e)
        return jsonify({"error": str(e)}), 500


# -------------------------
# 🫁 X-ray Prediction
# -------------------------
@app.route("/predict-xray", methods=["POST"])
def predict_xray():
    try:
        if xray_model is None:
            return jsonify({"error": "X-ray model not loaded"}), 500

        if "image" not in request.files:
            return jsonify({"error": "No image uploaded"}), 400

        file = request.files["image"]

        try:
            img_size = xray_model.input_shape[1]
        except:
            img_size = IMG_SIZE

        img = Image.open(BytesIO(file.read())).convert('RGB')
        img = img.resize((img_size, img_size))

        img_array = tf.keras.preprocessing.image.img_to_array(img)
        img_array = img_array.reshape(-1, img_size, img_size, 3)
        img_array = img_array / 255.0

        pred = xray_model.predict(img_array)

        if pred.shape[-1] == 1:
            value = float(pred[0][0])
            if value >= 0.5:
                result = "PNEUMONIA"
                confidence = value
            else:
                result = "NORMAL"
                confidence = 1 - value
        else:
            class_index = int(np.argmax(pred[0]))
            confidence = float(np.max(pred[0]))
            classes = ["NORMAL", "PNEUMONIA"]
            result = classes[class_index]

        return jsonify({
            "prediction": result,
            "confidence": float(confidence)
        })

    except Exception as e:
        print("❌ X-ray Error:", e)
        return jsonify({"error": str(e)}), 500


# -------------------------
# 🧪 Test Route
# -------------------------
@app.route("/")
def home():
    return "Backend running (ALL OK) ✅"


# -------------------------
# ▶ Run Server  
# -------------------------
if __name__ == "__main__":
    app.run(debug=True)