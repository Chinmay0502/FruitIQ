from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os

app = Flask(__name__)

# Load model
MODEL_PATH = "fruits_classification_model.keras"
model = load_model(MODEL_PATH)

IMG_SIZE = (224, 224)


@app.route("/")
def home():
    return jsonify({
        "message": "Fruit Freshness API is running"
    })


@app.route("/predict", methods=["POST"])
def predict():

    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]

    if file.filename == "":
        return jsonify({"error": "No selected image"}), 400

    temp_path = "temp.jpg"
    file.save(temp_path)

    try:
        # Load image
        img = image.load_img(temp_path, target_size=IMG_SIZE)

        # Convert to array
        img_array = image.img_to_array(img)

        # SAME preprocessing as Streamlit
        img_array = img_array / 255.0

        # Add batch dimension
        img_array = np.expand_dims(img_array, axis=0)

        # Predict
        prediction = model.predict(img_array, verbose=0)

        confidence = float(prediction[0][0])

        if confidence > 0.5:
            label = "Rotten"
            confidence_percent = confidence * 100
        else:
            label = "Fresh"
            confidence_percent = (1 - confidence) * 100

        return jsonify({
            "prediction": label,
            "confidence": round(confidence_percent, 2)
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)


if __name__ == "__main__":
    app.run(debug=True, port=5001)