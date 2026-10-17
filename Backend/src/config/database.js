const mongoose = require("mongoose")

let isConnected = false;

async function connectToDB() {
    if (isConnected || mongoose.connection.readyState >= 1) {
        return mongoose.connection;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log("Connected to Database");
        return mongoose.connection;
    } catch (err) {
        console.error("Database connection error:", err);
    }
}

module.exports = connectToDB