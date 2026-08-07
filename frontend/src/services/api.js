import axios from "axios";

// ======================================================
// AXIOS INSTANCE
// ======================================================

const api = axios.create({
    baseURL: "https://fruitiq-backend.onrender.com/api"
});

// ======================================================
// PREDICT FRUIT
// ======================================================

export const predictFruit = async (imageFile) => {

    const formData = new FormData();

    formData.append(
        "image",
        imageFile
    );

    const response = await api.post(
        "/predictions/predict",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};


// ======================================================
// GET ALL PREDICTIONS
// ======================================================

export const getAllPredictions = async () => {

    const response = await api.get(
        "/predictions"
    );

    return response.data;
};


// ======================================================
// GET ANALYTICS
// ======================================================

export const getAnalytics = async () => {

    const response = await api.get(
        "/predictions/analytics"
    );

    return response.data;
};


// ======================================================
// GET SINGLE PREDICTION
// ======================================================

export const getPrediction = async (id) => {

    const response = await api.get(
        `/predictions/${id}`
    );

    return response.data;
};


// ======================================================
// GET PREDICTION IMAGE URL
// ======================================================

export const getPredictionImageUrl = (id) => {

    return `https://fruitiq-backend.onrender.com/api/predictions/${id}/image`;
};


// ======================================================
// GET PREDICTION IMAGE
// ======================================================

export const getPredictionImage = (id) => {

    return `https://fruitiq-backend.onrender.com/api/predictions/${id}/image`;
};


// ======================================================
// DEFAULT EXPORT
// ======================================================

export default api;