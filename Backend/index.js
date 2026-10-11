const express = require("express");
require("dotenv").config();
const connectDB = require("./connection/connection");
const user = require("./routes/user");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use(express.json());
app.use("/api/user", user);

connectDB();
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
