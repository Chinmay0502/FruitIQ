const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
    predictImage,
    getPredictions,
    getPrediction,
    getPredictionImage,
    getAnalytics
} = require("../controllers/predictionController");


// ======================================================
// ANALYTICS
// ======================================================

router.get(
    "/analytics",
    getAnalytics
);


// ======================================================
// GET ALL PREDICTIONS
// ======================================================

router.get(
    "/",
    getPredictions
);


// ======================================================
// PREDICT IMAGE
// ======================================================

router.post(
    "/predict",
    upload.single("image"),
    predictImage
);


// ======================================================
// GET SINGLE PREDICTION
// ======================================================

router.get(
    "/:id",
    getPrediction
);


// ======================================================
// GET IMAGE
// ======================================================

router.get(
    "/:id/image",
    getPredictionImage
);


module.exports = router;