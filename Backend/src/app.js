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
const app = express();

const authRoutes = require("./routes/auth.routes");
const interviewRoutes = require("./routes/interview.routes");

// 1. Explicit Dynamic CORS Setup
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        return callback(null, origin);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// 2. Health check route (Direct Backend Check)
app.get("/", (req, res) => {
    res.status(200).json({ message: "Backend Server is Running Live!" });
});

// 3. API Routes Mounting
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

module.exports = app;