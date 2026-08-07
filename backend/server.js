const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

const connectDB = require("./config/db");

const predictionRoutes = require("./routes/predictionRoutes");


dotenv.config();


// ======================================================
// APP
// ======================================================

const app = express();


// ======================================================
// DATABASE
// ======================================================

connectDB();


// ======================================================
// MIDDLEWARE
// ======================================================

app.use(
    cors({
        origin: "http://localhost:5173"
    })
);

app.use(
    express.json()
);

app.use(
    express.urlencoded({
        extended: true
    })
);


// ======================================================
// ROUTES
// ======================================================

app.get("/", (req, res) => {

    res.json({
        message: "Fruit Freshness MERN API is running"
    });

});


app.use(
    "/api/predictions",
    predictionRoutes
);


// ======================================================
// ERROR HANDLER
// ======================================================

app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).json({

        success: false,

        message: err.message || "Server error"

    });

});


// ======================================================
// START SERVER
// ======================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Express server running on http://localhost:${PORT}`
    );

});