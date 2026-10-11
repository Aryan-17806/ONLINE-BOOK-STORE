const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URI);
        console.log("You successfully connected to MongoDB!");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        throw error;
    }
};

module.exports = connectDB;