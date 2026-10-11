const express = require("express");
require("dotenv").config();

const connectDB = require("./connection/connection");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

connectDB();//.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
//});