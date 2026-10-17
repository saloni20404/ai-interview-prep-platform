const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectToDB = require("./config/database");

const app = express();

const authRoutes = require("./routes/auth.routes");
const interviewRoutes = require("./routes/interview.routes");

// 1. CORS — allow localhost, Vercel deployments, and custom FRONTEND_URL
const configuredOrigin = process.env.FRONTEND_URL?.replace(/\/$/, "");

const corsOptions = {
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);
        if (
            origin === "http://localhost:5173" ||
            origin === "http://localhost:3000" ||
            (configuredOrigin && origin === configuredOrigin) ||
            origin.endsWith(".vercel.app")
        ) {
            return callback(null, true);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// 2. Health check route — responds IMMEDIATELY without waiting for DB
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Backend Server is Running Live!",
        dbStatus: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
        hasMongoUri: !!process.env.MONGO_URI,
        hasJwtSecret: !!process.env.JWT_SECRET,
        hasGeminiKey: !!(process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY)
    });
});

// 3. Database connection middleware for /api routes
app.use("/api", async (req, res, next) => {
    try {
        if (!process.env.MONGO_URI) {
            return res.status(500).json({
                message: "MONGO_URI environment variable is missing on Vercel."
            });
        }
        await connectToDB();
        next();
    } catch (err) {
        console.error("Database connection error in middleware:", err.message);
        return res.status(500).json({
            message: "Database connection failed. Check MongoDB Atlas network access (0.0.0.0/0).",
            error: err.message
        });
    }
});

// 4. API Routes Mounting
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

module.exports = app;