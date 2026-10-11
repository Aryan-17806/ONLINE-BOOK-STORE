const mongoose = require("mongoose");

const URL = "mongodb://127.0.0.1:27017/BookStore";
const connectDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log("You successfully connected to MongoDB!");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        throw error;
    }
};

module.exports = connectDB;