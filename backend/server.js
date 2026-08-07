const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const predictionRoutes = require("./routes/predictionRoutes");

dotenv.config();

const app = express();

connectDB();

const allowedOrigins = [
    "https://fruit-iq-sigma.vercel.app"
];

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true
    })
);

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);


app.get("/", (req, res) => {
    res.json({
        message: "Fruit Freshness MERN API is running"
    });
});


app.use(
    "/api/predictions",
    predictionRoutes
);


app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).json({
        success: false,
        message: err.message || "Server error"
    });

});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Express server running on port ${PORT}`
    );

});