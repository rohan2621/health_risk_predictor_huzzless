# 🏥 HealthGuard AI

> A smart AI system that helps predict heart disease risk and detect pneumonia from chest X-rays.

---

## 🌍 What is this project?

HealthGuard AI is a simple web application that uses Artificial Intelligence (AI) to help people understand their health risks.

It can:
- ❤️ Predict the risk of heart disease
- 🫁 Detect pneumonia from X-ray images

👉 The goal is to provide **quick health insights** without needing medical expertise.

---

## 🚨 Why is this important?

Many people:
- Don’t have quick access to doctors
- Don’t know early warning signs
- Get diagnosed too late

HealthGuard AI helps by giving **instant, basic health predictions**.

---

## 💡 How does it work?

### ❤️ Heart Disease Prediction
1. User enters health details (age, blood pressure, cholesterol, etc.)
2. AI analyzes the data
3. System shows:
   - Low Risk / Medium Risk / High Risk
   - Confidence score

---

### 🫁 Pneumonia Detection
1. User uploads a chest X-ray image
2. AI analyzes the image
3. System shows:
   - NORMAL or PNEUMONIA
   - Confidence score

---

## 🧠 What technology is used?

### Heart Model
- Uses **XGBoost (Machine Learning)**
- Trained on medical data
- Finds patterns in patient health records

### X-ray Model
- Uses **Deep Learning (CNN)**
- Trained on chest X-ray images
- Detects pneumonia patterns in images

---

## 📊 How accurate is it?

### ❤️ Heart Model
- Accuracy: ~84%
- AUC Score: 0.87  
👉 Good at identifying risk levels

### 🫁 X-ray Model
- Accuracy: ~73%
- F1 Score: ~0.90  
👉 Strong at detecting pneumonia cases

---

## ⚙️ What happens behind the scenes?

```text
User Input → Data Processing → AI Model → Prediction → Result