const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema(
    {
        image: {
            data: {
                type: Buffer,
                required: true
            },
            contentType: {
                type: String,
                required: true
            },
            originalName: {
                type: String,
                required: true
            }
        },

        prediction: {
            type: String,
            enum: ["Fresh", "Rotten"],
            required: true
        },

        confidence: {
            type: Number,
            required: true
        },

        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Prediction", predictionSchema);