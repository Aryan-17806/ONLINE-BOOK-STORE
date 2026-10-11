
const User = require("../models/users"); 
const express = require("express");
const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        if (!username || username.length < 3) {
            return res.status(400).json({ message: "Username Too Short" });
        }

        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({ message: "Password Too Short" });
        }

        const newUser = new User({
            username: username,
            email: email,
            password: password,
            address: address,
        });

        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
