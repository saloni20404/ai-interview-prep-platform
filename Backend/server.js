require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
    connectToDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    }).catch(err => {
        console.error("Failed to connect to DB on start:", err.message);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} (DB not connected)`)
        })
    });
}

module.exports = app;


