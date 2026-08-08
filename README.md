# 🍎 FruitIQ — AI-Powered Fruit Freshness Classification

**FruitIQ** is an AI-powered fruit freshness classification system designed to identify whether a fruit is **Fresh** or **Rotten**.

The project combines a **CNN-based deep learning model**, a modern **React + Tailwind CSS frontend**, a **Node.js + Express.js backend**, and **MongoDB** to provide an end-to-end fruit freshness detection platform.

The trained CNN model analyzes uploaded fruit images and predicts their freshness classification along with a confidence score. The application also stores prediction history and provides analytics to help users understand fruit classification activity.

> **FruitIQ currently supports three fruits: Apple, Banana, and Orange.**

---

# 🌟 Overview

Fruit freshness is an important factor in food quality, storage, retail, and everyday consumption. Manually determining whether a fruit is fresh or rotten can sometimes be difficult, especially when visual signs are subtle.

**FruitIQ** addresses this problem by using computer vision and deep learning to analyze fruit images and determine whether they are **Fresh** or **Rotten**.

The application follows a full-stack architecture:

* 🎨 **Frontend:** React.js + Tailwind CSS
* ⚙️ **Backend:** Node.js + Express.js
* 🗄️ **Database:** MongoDB
* 🤖 **Machine Learning:** Python + TensorFlow/Keras
* 🧠 **ML Algorithm:** Convolutional Neural Network (CNN)
* 🍎 **Supported Fruits:** Apple, Banana, Orange
* 🔗 **API Communication:** REST APIs
* 📈 **Analytics:** Prediction history and classification statistics
* ☁️ **Deployment:** Vercel + Render + Google Cloud Run

---

# ✨ Key Features

* 🍎 Detect freshness of Apples
* 🍌 Detect freshness of Bananas
* 🍊 Detect freshness of Oranges
* 🤖 CNN-based image classification
* 🖼️ Upload fruit images for analysis
* 🎯 Confidence score for predictions
* ⚡ Fast image classification
* 🌐 Modern responsive React interface
* 🎨 Tailwind CSS-based UI
* 🔗 REST API integration
* 🟢 Node.js + Express.js backend
* 🗄️ MongoDB prediction storage
* 📜 Prediction history
* 📊 Analytics dashboard
* 📈 Fresh vs Rotten distribution
* 📉 Confidence analysis
* 📅 Daily prediction statistics
* 🖼️ Stored prediction images
* 🔄 Frontend → Backend → ML service communication
* 🔐 Environment variable support
* 🚀 Production-ready deployment architecture

---

# 🍎 Supported Fruits

FruitIQ currently supports freshness classification for:

| Fruit     | Fresh | Rotten |
| --------- | :---: | :----: |
| 🍎 Apple  |   ✅   |    ✅   |
| 🍌 Banana |   ✅   |    ✅   |
| 🍊 Orange |   ✅   |    ✅   |

> FruitIQ is currently limited to these three fruit categories. Images of unsupported fruits may produce unreliable results.

---

# 🏗️ System Architecture

FruitIQ follows a multi-layer architecture where the frontend, backend, database, and machine learning service communicate with each other.

```text
                         ┌──────────────────────┐
                         │        User          │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   React Frontend     │
                         │   Tailwind CSS       │
                         └──────────┬───────────┘
                                    │
                                    │ Image Upload
                                    ▼
                         ┌──────────────────────┐
                         │   Node.js Backend    │
                         │   Express.js API     │
                         └───────┬───────┬──────┘
                                 │       │
                    Store Result │       │ Prediction Request
                                 │       │
                                 ▼       ▼
                        ┌────────────┐  ┌──────────────────┐
                        │  MongoDB   │  │  Python ML API   │
                        │  Database  │  │  CNN Model       │
                        └────────────┘  └────────┬─────────┘
                                                 │
                                                 ▼
                                      ┌─────────────────────┐
                                      │ Fresh / Rotten +    │
                                      │ Confidence Score    │
                                      └──────────┬──────────┘
                                                 │
                                                 ▼
                                      ┌─────────────────────┐
                                      │   Node.js Backend   │
                                      └──────────┬──────────┘
                                                 │
                                                 ▼
                                      ┌─────────────────────┐
                                      │   React Frontend    │
                                      └─────────────────────┘
```

---

# 🔄 How It Works

The FruitIQ classification workflow can be summarized as follows.

## Step 1 — User Input

The user uploads an image of a fruit through the FruitIQ frontend.

The application currently supports:

```text
Apple
Banana
Orange
```

---

## Step 2 — Frontend Request

The React frontend sends the selected image to the Node.js/Express.js backend through a REST API.

Example endpoint:

```text
POST /api/predictions/predict
```

---

## Step 3 — Backend Processing

The Express.js backend receives the uploaded image and validates the request.

The backend then creates a multipart form request and forwards the image to the Python machine learning service.

---

## Step 4 — ML Prediction

The Python machine learning service loads the trained CNN model.

The uploaded image is processed and passed to the model.

The model determines the freshness classification.

Possible results include:

```text
Fresh
```

or

```text
Rotten
```

---

## Step 5 — Confidence Calculation

The machine learning service returns the prediction along with its confidence score.

For example:

```text
Prediction: Fresh
Confidence: 98.7%
```

---

## Step 6 — Database Storage

The backend stores the prediction and uploaded image information in MongoDB.

A prediction record contains information such as:

```text
Image
Prediction
Confidence
Created At
Updated At
```

---

## Step 7 — Result Display

The backend sends the prediction response to the React frontend.

The frontend displays:

* Fruit freshness
* Prediction result
* Confidence
* Uploaded image
* Analysis information

---

## Step 8 — History & Analytics

Stored predictions can be retrieved through the prediction APIs and displayed on the history and analytics pages.

The dashboard can show:

* Total predictions
* Fresh predictions
* Rotten predictions
* Average confidence
* Fresh percentage
* Rotten percentage
* Confidence distribution
* Daily prediction trends
* Recent predictions

---

# 🤖 Machine Learning Model

The core of FruitIQ is a **Convolutional Neural Network (CNN)** based deep learning model.

CNNs are particularly useful for image classification because they can learn visual patterns such as:

* Color
* Texture
* Shape
* Surface patterns
* Spots
* Bruising
* Rotting regions
* Other visual characteristics

The model learns these visual features from fruit images and uses them to classify the freshness condition.

---

# 🧠 CNN Architecture

A simplified representation of the FruitIQ image classification pipeline is:

```text
Fruit Image
     │
     ▼
Image Preprocessing
     │
     ▼
Image Resizing
     │
     ▼
Normalization
     │
     ▼
CNN Layers
     │
     ├── Convolution
     ├── Activation
     ├── Pooling
     └── Feature Extraction
     │
     ▼
Dense Layers
     │
     ▼
Output Layer
     │
     ▼
Fresh / Rotten
     │
     ▼
Confidence Score
```

The trained Keras model is loaded by the Python machine learning service during application startup.

---

# 🎯 Classification Output

FruitIQ produces two primary freshness classifications.

## 🟢 Fresh

The model determines that the fruit appears fresh based on the visual features learned during training.

## 🔴 Rotten

The model determines that the fruit appears rotten based on the visual features learned during training.

The system also provides a confidence value associated with the prediction.

Example:

```text
Fruit:
Apple

Prediction:
Fresh

Confidence:
99.5%
```

---

# 📸 Image Processing Pipeline

When an image is uploaded, the image follows this pipeline:

```text
Uploaded Image
      │
      ▼
Backend receives image
      │
      ▼
ML API
      │
      ▼
Image preprocessing
      │
      ▼
CNN model
      │
      ▼
Prediction probability
      │
      ▼
Fresh / Rotten
      │
      ▼
Confidence score
```

---

# 📊 Prediction History

FruitIQ stores classification results in MongoDB.

Each prediction contains information similar to:

```json
{
  "prediction": "Fresh",
  "confidence": 99.5,
  "createdAt": "2026-08-08T00:00:00.000Z"
}
```

The system also stores the uploaded image so that it can be displayed later from the prediction history.

The history API can return information such as:

```text
Prediction
Confidence
Created At
Original Image Name
Content Type
Image URL
```

---

# 📈 Analytics Dashboard

FruitIQ includes an analytics system based on prediction records stored in MongoDB.

The dashboard can display:

### Total Predictions

Total number of fruit images analyzed.

### Fresh Predictions

Number of images classified as Fresh.

### Rotten Predictions

Number of images classified as Rotten.

### Average Confidence

Average confidence across stored predictions.

### Fresh Percentage

Percentage of predictions classified as Fresh.

### Rotten Percentage

Percentage of predictions classified as Rotten.

### Confidence Distribution

Predictions grouped into confidence ranges:

```text
0–20%
20–40%
40–60%
60–80%
80–100%
```

### Daily Analytics

Daily statistics can include:

```text
Date
Total Predictions
Fresh Predictions
Rotten Predictions
Average Confidence
```

### Recent Predictions

The latest predictions can be displayed with:

```text
Image
Prediction
Confidence
Date
```

---

# 🛠️ Technology Stack

## Frontend

### React.js

React is used to build the interactive FruitIQ user interface.

Responsibilities include:

* Image upload
* Prediction form
* API communication
* Prediction result display
* Analysis page
* History page
* Analytics dashboard
* Client-side navigation
* Responsive UI
* Loading states
* Error handling

### Tailwind CSS

Tailwind CSS is used to build the modern responsive interface.

The frontend uses:

* Responsive layouts
* Cards
* Badges
* Buttons
* Navigation
* Animations
* Analytics components
* Prediction result components

### Framer Motion

Framer Motion can be used for interface animations and transitions.

Examples include:

* Page transitions
* Card animations
* Prediction result animations
* Loading animations
* Hover effects

### Lucide React

Lucide React icons are used throughout the interface for visual indicators and actions.

---

# ⚙️ Backend

## Node.js

Node.js provides the runtime environment for the backend.

## Express.js

Express.js is used to create REST APIs and connect the frontend, database, and machine learning service.

The backend is responsible for:

* API endpoints
* Image upload handling
* Request validation
* ML service communication
* MongoDB operations
* Prediction storage
* Prediction history
* Analytics generation
* Image retrieval
* Error handling
* CORS configuration

---

# 🗄️ Database

## MongoDB

MongoDB is used to store fruit prediction history and associated image data.

A prediction model contains fields similar to:

```javascript
{
  image: {
    data: Buffer,
    contentType: String,
    originalName: String
  },

  prediction: {
    type: String,
    enum: ["Fresh", "Rotten"]
  },

  confidence: Number
}
```

Timestamps are also maintained for prediction records.

The database therefore maintains:

* Fruit image
* Image metadata
* Prediction
* Confidence
* Created timestamp
* Updated timestamp

---

# 🤖 Machine Learning Service

## Python

Python is used to serve the trained machine learning model.

## TensorFlow / Keras

TensorFlow/Keras is used to load and execute the trained CNN model.

The ML service is responsible for:

1. Loading the trained CNN model.
2. Receiving fruit images.
3. Preprocessing images.
4. Running model inference.
5. Determining the predicted freshness.
6. Calculating the confidence score.
7. Returning the prediction to the Node.js backend.

---

# 📁 Project Structure

A possible FruitIQ project structure is:

```text
FruitIQ/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   │   └── predictionController.js
│   ├── middleware/
│   │   └── upload.js
│   ├── models/
│   │   └── prediction.js
│   ├── routes/
│   │   └── predictionRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── ml_model/
│   ├── fruits_classification_model.keras
│   ├── app.py
│   └── requirements.txt
│
├── README.md
└── .gitignore
```

> The exact project structure may vary depending on the implementation.

---

# 🚀 Getting Started

Follow the instructions below to run FruitIQ locally.

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Python 3.x
* pip
* MongoDB / MongoDB Atlas
* Git

---

# 📥 Clone the Repository

```bash
git clone https://github.com/Chinmay0502/FruitIQ.git
```

Navigate to the project:

```bash
cd FruitIQ
```

---

# 🎨 Frontend Setup

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The React application will be available at the local development URL provided by Vite.

For example:

```text
http://localhost:5173
```

---

# ⚙️ Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URL=your_mongodb_connection_string

ML_API_URL=http://127.0.0.1:8000
```

Start the backend:

```bash
npm run dev
```

Or:

```bash
npm start
```

The backend will run on:

```text
http://localhost:5000
```

---

# 🤖 ML Service Setup

Navigate to the machine learning directory:

```bash
cd ml_model
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the environment.

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the ML service:

```bash
python app.py
```

The ML service can be configured to run on a local port such as:

```text
http://127.0.0.1:8000
```

---

# 🔗 Application Communication

The complete application follows this flow:

```text
                         User
                          │
                          ▼
                  React Frontend
                  localhost:5173
                          │
                          │ POST image
                          ▼
                  Node.js Backend
                  localhost:5000
                          │
                          │ Prediction Request
                          ▼
                   Python ML API
                          │
                          ▼
                     CNN Model
                          │
                          ▼
                  Fresh / Rotten
                          │
                          ▼
                   Confidence
                          │
                          ▼
                  Node.js Backend
                     │        │
                     │        └────────► MongoDB
                     │
                     ▼
                  React Frontend
                     │
                     ▼
                Prediction Result
```

---

# 📡 API Endpoints

## Predict Fruit

```text
POST /api/predictions/predict
```

The endpoint accepts a fruit image using multipart form data.

The image field is:

```text
image
```

Example response:

```json
{
  "success": true,
  "message": "Prediction completed successfully",
  "data": {
    "id": "64xxxxxxxx",
    "prediction": "Fresh",
    "confidence": 99.5,
    "createdAt": "2026-08-08T00:00:00.000Z",
    "imageUrl": "/api/predictions/64xxxxxxxx/image"
  }
}
```

---

# 📜 Get All Predictions

```text
GET /api/predictions
```

Returns previously stored predictions.

Example response:

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "64xxxxxxxx",
      "prediction": "Fresh",
      "confidence": 98.7,
      "createdAt": "2026-08-08T00:00:00.000Z",
      "imageUrl": "/api/predictions/64xxxxxxxx/image"
    },
    {
      "id": "64xxxxxxxx",
      "prediction": "Rotten",
      "confidence": 96.2,
      "createdAt": "2026-08-08T00:00:00.000Z",
      "imageUrl": "/api/predictions/64xxxxxxxx/image"
    }
  ]
}
```

---

# 🔎 Get Single Prediction

```text
GET /api/predictions/:id
```

Returns information about a specific prediction.

Example:

```text
GET /api/predictions/64xxxxxxxx
```

---

# 🖼️ Get Prediction Image

```text
GET /api/predictions/:id/image
```

This endpoint retrieves the original uploaded fruit image stored in MongoDB.

---

# 📊 Analytics

```text
GET /api/predictions/analytics
```

The analytics endpoint provides information including:

```text
Total predictions
Fresh predictions
Rotten predictions
Average confidence
Fresh percentage
Rotten percentage
Recent predictions
Confidence distribution
Daily analytics
```

Example response structure:

```json
{
  "success": true,
  "data": {
    "total": 100,
    "fresh": 72,
    "rotten": 28,
    "averageConfidence": 94.62,
    "freshPercentage": 72,
    "rottenPercentage": 28,
    "recent": [],
    "confidenceDistribution": [],
    "dailyAnalytics": []
  }
}
```

---

# 📊 Analytics Workflow

The analytics page uses prediction records stored in MongoDB.

```text
Fruit Image
     │
     ▼
Prediction
     │
     ▼
MongoDB
     │
     ▼
GET /api/predictions
     │
     ▼
React History / Analytics Page
     │
     ├── Total Predictions
     ├── Fresh Count
     ├── Rotten Count
     ├── Average Confidence
     ├── Fresh Percentage
     ├── Rotten Percentage
     ├── Confidence Distribution
     ├── Daily Analytics
     └── Recent Predictions
```

This allows the dashboard to display information based on actual prediction history instead of static demo data.

---

# 🧪 Example Classification

## 🍎 Fresh Apple

Possible result:

```text
Fruit: Apple

Prediction: Fresh

Confidence: 98.9%
```

## 🍌 Rotten Banana

Possible result:

```text
Fruit: Banana

Prediction: Rotten

Confidence: 97.4%
```

## 🍊 Fresh Orange

Possible result:

```text
Fruit: Orange

Prediction: Fresh

Confidence: 99.1%
```

> Actual predictions depend on the trained model, image quality, preprocessing pipeline, and input image.

---

# 🔐 Environment Variables

Environment variables should be used for sensitive configuration.

Example backend configuration:

```env
PORT=5000

MONGO_URL=your_mongodb_connection_string

ML_API_URL=http://127.0.0.1:8000
```

The frontend can use an environment variable for the backend API URL.

Example:

```env
VITE_API_URL=http://localhost:5000
```

For production:

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

Never commit database credentials or private configuration files to GitHub.

Add them to `.gitignore`:

```gitignore
node_modules/
frontend/node_modules/
backend/node_modules/

.env
.env.*
!.env.example

venv/
__pycache__/
*.pyc
```

---

# ☁️ Deployment

FruitIQ uses a distributed deployment architecture where the frontend, backend, and machine learning service can be deployed independently.

A production architecture can look like:

```text
                    ┌──────────────────┐
                    │      Vercel      │
                    │ React Frontend   │
                    └────────┬─────────┘
                             │
                             │ HTTPS
                             ▼
                    ┌──────────────────┐
                    │      Render      │
                    │ Node + Express   │
                    └────────┬─────────┘
                             │
                    ┌────────┴─────────┐
                    │                  │
                    ▼                  ▼
          ┌────────────────┐   ┌──────────────────┐
          │ MongoDB Atlas  │   │ Google Cloud Run │
          │   Database     │   │ Python ML API    │
          └────────────────┘   │ CNN Model        │
                               └──────────────────┘
```

### Frontend

```text
Vercel
```

### Backend

```text
Render
```

### Database

```text
MongoDB Atlas
```

### Machine Learning Service

```text
Google Cloud Run
```

The ML service is deployed independently so that the TensorFlow/Keras model can run separately from the Node.js backend.

---

# 🌐 Production API Flow

After deployment, the architecture becomes:

```text
User
 │
 ▼
Vercel
React Application
 │
 │ HTTPS
 ▼
Render
Node.js + Express
 │
 ├─────────────────────► MongoDB Atlas
 │
 │ HTTPS
 ▼
Google Cloud Run
Python ML API
 │
 ▼
CNN Model
 │
 ▼
Fresh / Rotten
 │
 ▼
Node.js Backend
 │
 ▼
React Frontend
 │
 ▼
Prediction Result
```

---

# 🧪 Testing

FruitIQ can be tested at several levels.

## Frontend Testing

Test:

* Image upload
* Supported fruit images
* Analyze button
* Loading states
* API communication
* Prediction result
* Confidence display
* Analysis page
* History page
* Analytics dashboard
* Responsive layout
* Error states

## Backend Testing

Test:

* `/api/predictions/predict`
* `/api/predictions`
* `/api/predictions/:id`
* `/api/predictions/:id/image`
* `/api/predictions/analytics`
* MongoDB connection
* ML service communication
* Image upload handling
* Error handling
* CORS

## Machine Learning Testing

Test:

* Model loading
* Image preprocessing
* Input shape
* Prediction output
* Fresh/Rotten mapping
* Confidence calculation
* Different fruit types
* Unsupported fruit images

---

# ⚠️ Current Limitations

FruitIQ's prediction quality depends on the training dataset and the image preprocessing pipeline used during model development.

Potential limitations include:

* Training dataset limitations
* Different lighting conditions
* Blurry images
* Unusual camera angles
* Partially visible fruits
* Multiple fruits in one image
* Previously unseen fruit conditions
* Very similar fresh and rotten appearances
* Unsupported fruit types
* Background objects affecting classification
* Model confidence not always representing real-world certainty

Therefore, FruitIQ should be considered a **fruit freshness classification assistance system**, not a guaranteed food-safety or quality-control solution.

> A model prediction should not be treated as a definitive determination of whether a fruit is safe to eat.

---

# 🔮 Future Improvements

Several improvements can be added in future versions.

## 🧠 Advanced Computer Vision Models

Future versions could experiment with:

* ResNet
* EfficientNet
* MobileNet
* DenseNet
* Vision Transformers
* Transfer Learning
* Object Detection
* Image Segmentation

---

## 🍇 More Fruit Categories

Future versions could expand beyond the current three supported fruits.

Potential additions include:

```text
Mango
Guava
Papaya
Pineapple
Strawberry
Grapes
Watermelon
```

---

## 🔍 Fruit Detection

A future version could detect multiple fruits within a single image.

For example:

```text
Image
 │
 ├── Apple → Fresh
 ├── Banana → Rotten
 └── Orange → Fresh
```

This could be implemented using object detection models.

---

## 📊 Advanced Analytics

The analytics dashboard could be expanded with:

* Fruit-wise statistics
* Freshness trends
* Daily prediction volume
* Weekly prediction trends
* Monthly statistics
* Fruit-specific confidence
* Prediction accuracy tracking
* Model performance metrics

---

## 📱 Mobile Application

A mobile version could allow users to directly capture fruit images using their smartphone camera.

Possible technologies include:

* React Native
* Flutter
* Native Android
* Native iOS

---

## ☁️ Cloud-Based ML Scaling

The ML service could be further optimized for:

* Faster inference
* Automatic scaling
* Batch prediction
* GPU inference
* Model versioning
* Monitoring
* Logging

---

## 🔄 Real-Time Analytics

The history dashboard can be enhanced with real-time updates so that newly classified fruits automatically appear without manually refreshing the page.

Possible technologies include:

* Polling
* Server-Sent Events
* WebSockets
* Socket.IO

---

# 🔐 Security Considerations

FruitIQ should follow standard application security practices.

Important considerations include:

* Store secrets in environment variables.
* Never expose MongoDB credentials.
* Validate uploaded files.
* Restrict accepted image MIME types.
* Configure CORS correctly.
* Use HTTPS in production.
* Avoid exposing internal ML service configuration unnecessarily.
* Limit maximum upload size.
* Add rate limiting for public APIs.
* Keep dependencies updated.
* Sanitize user-provided data where appropriate.

---

# 🐛 Error Handling

FruitIQ includes multiple layers where errors can occur:

```text
React Frontend
      │
      ├── Network Error
      │
      ▼
Express Backend
      │
      ├── Validation Error
      ├── Upload Error
      ├── MongoDB Error
      └── ML Service Error
               │
               ▼
          ML Service
               │
               ├── Model Error
               ├── Image Processing Error
               └── Prediction Error
```

Production deployments should provide appropriate error responses without exposing sensitive internal information.

---

# 🤝 Contributing

Contributions are welcome!

To contribute:

### 1. Fork the repository

### 2. Create a feature branch

```bash
git checkout -b feature/your-feature
```

### 3. Make your changes

### 4. Commit your changes

```bash
git commit -m "Add new feature"
```

### 5. Push the branch

```bash
git push origin feature/your-feature
```

### 6. Open a Pull Request

---

# 🐛 Bug Reports

If you discover a bug, please open an issue and include:

* Description of the problem
* Steps to reproduce
* Expected behavior
* Actual behavior
* Screenshots
* Browser information
* Error logs when applicable

---

# 💬 Feedback

Feedback and suggestions are welcome.

If you have ideas for improving FruitIQ, feel free to open an issue or submit a pull request.

---

# 📜 License

This project is available under the license included in this repository.

If you are using the MIT License, this section can be replaced with:

```text
MIT License
```

---

# 👨‍💻 Author

**Chinmay Kumar Sahoo**

* GitHub: `https://github.com/Chinmay0502`

---

# ⭐ Support

If you found FruitIQ useful or interesting, consider giving the repository a ⭐ on GitHub.

Your support helps motivate further development.

---

# 📌 Summary

**FruitIQ** is a full-stack AI-powered fruit freshness classification application that combines deep learning with modern web technologies.

The project uses a **CNN-based machine learning model** for image classification, a **React + Tailwind CSS frontend**, a **Node.js + Express.js backend**, **MongoDB for prediction history**, and a **Python/TensorFlow/Keras machine learning service**.

The application currently supports:

```text
🍎 Apple
🍌 Banana
🍊 Orange
```

and classifies them as:

```text
🟢 Fresh
🔴 Rotten
```

The system demonstrates how computer vision and deep learning can be integrated into a practical full-stack application to solve a real-world problem:

> **Using AI to help identify the freshness condition of fruits from images.**

```text
🍎 FruitIQ
│
├── 🧠 CNN Deep Learning Model
├── 🍎 Apple Classification
├── 🍌 Banana Classification
├── 🍊 Orange Classification
├── 🟢 Fresh Detection
├── 🔴 Rotten Detection
├── 🎯 Prediction Confidence
├── ⚛️ React Frontend
├── 🎨 Tailwind CSS
├── 🟢 Node.js
├── 🚀 Express.js
├── 🍃 MongoDB
├── 🐍 Python
├── 🧠 TensorFlow / Keras
├── 📜 Prediction History
├── 📊 Analytics Dashboard
└── ☁️ Cloud Deployment

```

**Built with ❤️ to explore the intersection of Computer Vision, Deep Learning, and Full-Stack Development.**
