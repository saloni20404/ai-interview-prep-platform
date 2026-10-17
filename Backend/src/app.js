// const express = require("express")
// const cookieParser = require("cookie-parser")
// const cors = require("cors")

// const app = express()

// app.use(express.json())
// app.use(cookieParser())
// app.use(cors({
//     origin: "https://ai-interview-prep-platform-txbl.vercel.app",
//     origin: "http://localhost:5173",
//     credentials: true
// }))

// /* require all the routes here */
// const authRouter = require("./routes/auth.routes")
// const interviewRouter = require("./routes/interview.routes")


// /* using all the routes here */
// app.use("/api/auth", authRouter)
// app.use("/api/interview", interviewRouter)



// module.exports = app


const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDB = require("./config/database");

const app = express();

const authRoutes = require("./routes/auth.routes");
const interviewRoutes = require("./routes/interview.routes");

// 1. CORS — allow localhost, Vercel deployments, and custom FRONTEND_URL
const configuredOrigin = process.env.FRONTEND_URL?.replace(/\/$/, "");

app.use(cors({
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
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

// 2. Ensure Database is connected for serverless invocations
app.use(async (req, res, next) => {
    try {
        await connectToDB();
        next();
    } catch (err) {
        console.error("Database connection error in middleware:", err);
        res.status(500).json({ message: "Failed to connect to database" });
    }
});

// 3. Health check route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Backend Server is Running Live!" });
});

// 4. API Routes Mounting
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

module.exports = app;