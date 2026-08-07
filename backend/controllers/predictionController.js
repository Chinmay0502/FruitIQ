const axios = require("axios");
const FormData = require("form-data");

const Prediction = require("../models/prediction");

// ======================================================
// PREDICT IMAGE
// ======================================================

const predictImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image uploaded"
            });
        }

        // --------------------------------------------------
        // Send image to Flask ML API
        // --------------------------------------------------

        const formData = new FormData();

        formData.append(
            "image",
            req.file.buffer,
            {
                filename: req.file.originalname,
                contentType: req.file.mimetype
            }
        );

        const flaskResponse = await axios.post(
            `${process.env.ML_API_URL}/predict`,
            formData,
            {
                headers: {
                    ...formData.getHeaders()
                },
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
                timeout: 60000
            }
        );

        const prediction =
            flaskResponse.data?.prediction;

        const confidence =
            Number(flaskResponse.data?.confidence || 0);

        if (!prediction) {
            return res.status(500).json({
                success: false,
                message: "ML model did not return a prediction"
            });
        }

        // --------------------------------------------------
        // Normalize prediction
        // --------------------------------------------------

        const normalizedPrediction =
            String(prediction).toLowerCase().includes("fresh")
                ? "Fresh"
                : "Rotten";

        // --------------------------------------------------
        // Save image + prediction to MongoDB
        // --------------------------------------------------

        const newPrediction = await Prediction.create({
            image: {
                data: req.file.buffer,
                contentType: req.file.mimetype,
                originalName: req.file.originalname
            },

            prediction: normalizedPrediction,

            confidence
        });

        // --------------------------------------------------
        // Response
        // --------------------------------------------------

        return res.status(201).json({
            success: true,

            message: "Prediction completed successfully",

            data: {
                id: newPrediction._id,

                prediction: normalizedPrediction,

                confidence,

                createdAt: newPrediction.createdAt,

                imageUrl:
                    `/api/predictions/${newPrediction._id}/image`
            }
        });

    } catch (error) {
        console.error("Prediction error:");
        console.error(
            error.response?.data ||
            error.message
        );

        return res.status(500).json({
            success: false,

            message: "Prediction failed",

            error:
                error.response?.data ||
                error.message
        });
    }
};


// ======================================================
// GET ALL PREDICTIONS
// ======================================================

const getPredictions = async (req, res) => {
    try {

        const predictions = await Prediction
            .find()
            .select("-image.data")
            .sort({
                createdAt: -1
            })
            .lean();


        // Add image URL to every prediction
        const formattedPredictions =
            predictions.map((item) => ({
                id: item._id,

                prediction:
                    item.prediction,

                confidence:
                    Number(item.confidence || 0),

                createdAt:
                    item.createdAt,

                updatedAt:
                    item.updatedAt,

                originalName:
                    item.image?.originalName || null,

                contentType:
                    item.image?.contentType || null,

                imageUrl:
                    `/api/predictions/${item._id}/image`
            }));


        return res.status(200).json({

            success: true,

            count:
                formattedPredictions.length,

            data:
                formattedPredictions
        });

    } catch (error) {

        console.error(
            "Get predictions error:",
            error.message
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch predictions",

            error:
                error.message
        });
    }
};


// ======================================================
// GET SINGLE PREDICTION
// ======================================================

const getPrediction = async (req, res) => {
    try {

        const prediction =
            await Prediction.findById(
                req.params.id
            );


        if (!prediction) {

            return res.status(404).json({

                success: false,

                message:
                    "Prediction not found"
            });
        }


        return res.status(200).json({

            success: true,

            data: {

                id:
                    prediction._id,

                prediction:
                    prediction.prediction,

                confidence:
                    Number(
                        prediction.confidence || 0
                    ),

                createdAt:
                    prediction.createdAt,

                imageUrl:
                    `/api/predictions/${prediction._id}/image`,

                originalName:
                    prediction.image?.originalName ||
                    null,

                contentType:
                    prediction.image?.contentType ||
                    null
            }
        });

    } catch (error) {

        console.error(
            "Get prediction error:",
            error.message
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch prediction",

            error:
                error.message
        });
    }
};


// ======================================================
// GET IMAGE FROM MONGODB
// ======================================================

const getPredictionImage = async (req, res) => {
    try {

        const prediction =
            await Prediction.findById(
                req.params.id
            );


        if (!prediction) {

            return res.status(404).json({

                success: false,

                message:
                    "Image not found"
            });
        }


        if (
            !prediction.image ||
            !prediction.image.data
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Image data not found"
            });
        }


        res.set(
            "Content-Type",
            prediction.image.contentType ||
            "image/jpeg"
        );


        // Browser caching
        res.set(
            "Cache-Control",
            "public, max-age=3600"
        );


        return res.send(
            prediction.image.data
        );

    } catch (error) {

        console.error(
            "Get image error:",
            error.message
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to retrieve image",

            error:
                error.message
        });
    }
};


// ======================================================
// ANALYTICS
// ======================================================

const getAnalytics = async (req, res) => {
    try {

        // --------------------------------------------------
        // BASIC COUNTS
        // --------------------------------------------------

        const total =
            await Prediction.countDocuments();


        const fresh =
            await Prediction.countDocuments({
                prediction: "Fresh"
            });


        const rotten =
            await Prediction.countDocuments({
                prediction: "Rotten"
            });


        // --------------------------------------------------
        // AVERAGE CONFIDENCE
        // --------------------------------------------------

        const confidenceResult =
            await Prediction.aggregate([

                {
                    $group: {
                        _id: null,

                        averageConfidence: {
                            $avg: "$confidence"
                        }
                    }
                }

            ]);


        const averageConfidence =
            confidenceResult.length > 0
                ? Number(
                    confidenceResult[0]
                        .averageConfidence
                        .toFixed(2)
                )
                : 0;


        // --------------------------------------------------
        // PERCENTAGES
        // --------------------------------------------------

        const freshPercentage =
            total > 0
                ? Number(
                    (
                        (fresh / total) *
                        100
                    ).toFixed(2)
                )
                : 0;


        const rottenPercentage =
            total > 0
                ? Number(
                    (
                        (rotten / total) *
                        100
                    ).toFixed(2)
                )
                : 0;


        // --------------------------------------------------
        // RECENT PREDICTIONS
        // --------------------------------------------------

        const recent =
            await Prediction
                .find()
                .select("-image.data")
                .sort({
                    createdAt: -1
                })
                .limit(10)
                .lean();


        const formattedRecent =
            recent.map((item) => ({

                id:
                    item._id,

                prediction:
                    item.prediction,

                confidence:
                    Number(
                        item.confidence || 0
                    ),

                createdAt:
                    item.createdAt,

                imageUrl:
                    `/api/predictions/${item._id}/image`
            }));


        // --------------------------------------------------
        // CONFIDENCE DISTRIBUTION
        // --------------------------------------------------

        const confidenceDistribution =
            await Prediction.aggregate([

                {
                    $bucket: {

                        groupBy:
                            "$confidence",

                        boundaries: [
                            0,
                            20,
                            40,
                            60,
                            80,
                            101
                        ],

                        default:
                            "unknown",

                        output: {

                            count: {
                                $sum: 1
                            },

                            averageConfidence: {
                                $avg:
                                    "$confidence"
                            }
                        }
                    }
                }

            ]);


        // Convert bucket values into
        // frontend-friendly chart data

        const confidenceChart =
            confidenceDistribution.map(
                (item) => {

                    let range;

                    if (item._id === 0) {
                        range = "0-20%";
                    }
                    else if (item._id === 20) {
                        range = "20-40%";
                    }
                    else if (item._id === 40) {
                        range = "40-60%";
                    }
                    else if (item._id === 60) {
                        range = "60-80%";
                    }
                    else if (item._id === 80) {
                        range = "80-100%";
                    }
                    else {
                        range = "Unknown";
                    }

                    return {

                        range,

                        count:
                            item.count,

                        averageConfidence:
                            item.averageConfidence
                                ? Number(
                                    item.averageConfidence
                                        .toFixed(2)
                                )
                                : 0
                    };
                }
            );


        // --------------------------------------------------
        // DAILY ANALYTICS
        // --------------------------------------------------

        const dailyAnalytics =
            await Prediction.aggregate([

                {
                    $group: {

                        _id: {

                            year: {
                                $year:
                                    "$createdAt"
                            },

                            month: {
                                $month:
                                    "$createdAt"
                            },

                            day: {
                                $dayOfMonth:
                                    "$createdAt"
                            }
                        },

                        total: {
                            $sum: 1
                        },

                        fresh: {

                            $sum: {

                                $cond: [
                                    {
                                        $eq: [
                                            "$prediction",
                                            "Fresh"
                                        ]
                                    },
                                    1,
                                    0
                                ]
                            }
                        },

                        rotten: {

                            $sum: {

                                $cond: [
                                    {
                                        $eq: [
                                            "$prediction",
                                            "Rotten"
                                        ]
                                    },
                                    1,
                                    0
                                ]
                            }
                        },

                        averageConfidence: {
                            $avg:
                                "$confidence"
                        }
                    }
                },

                {
                    $sort: {
                        "_id.year": 1,
                        "_id.month": 1,
                        "_id.day": 1
                    }
                }

            ]);


        const dailyChart =
            dailyAnalytics.map(
                (item) => {

                    const date =
                        `${item._id.year}-${String(
                            item._id.month
                        ).padStart(2, "0")}-${String(
                            item._id.day
                        ).padStart(2, "0")}`;


                    return {

                        date,

                        total:
                            item.total,

                        fresh:
                            item.fresh,

                        rotten:
                            item.rotten,

                        averageConfidence:
                            item.averageConfidence
                                ? Number(
                                    item.averageConfidence
                                        .toFixed(2)
                                )
                                : 0
                    };
                }
            );


        // --------------------------------------------------
        // FINAL RESPONSE
        // --------------------------------------------------

        return res.status(200).json({

            success: true,

            data: {

                total,

                fresh,

                rotten,

                averageConfidence,

                freshPercentage,

                rottenPercentage,

                recent:
                    formattedRecent,

                confidenceDistribution:
                    confidenceChart,

                dailyAnalytics:
                    dailyChart
            }

        });

    } catch (error) {

        console.error(
            "Analytics error:",
            error.message
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to generate analytics",

            error:
                error.message
        });
    }
};


// ======================================================
// EXPORTS
// ======================================================

module.exports = {

    predictImage,

    getPredictions,

    getPrediction,

    getPredictionImage,

    getAnalytics

};