const mongoose = require("mongoose")

let isConnected = false;

async function connectToDB() {
    if (isConnected || mongoose.connection.readyState >= 1) {
        return mongoose.connection;
    }

    if (!process.env.MONGO_URI) {
        console.error("MONGO_URI environment variable is missing!");
        throw new Error("MONGO_URI environment variable is not defined");
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 5000,
        });
        isConnected = true;
        console.log("Connected to Database");
        return mongoose.connection;
    } catch (err) {
        console.error("Database connection error:", err.message);
        throw err;
    }
}

module.exports = connectToDB