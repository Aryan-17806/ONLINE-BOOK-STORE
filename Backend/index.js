const express = require("express");
// require("dotenv").config();
const connectDB = require("./connection/connection");
const user = require("./routes/user");
const Book = require("./routes/book");
const favourite = require("./routes/favourite");
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use(express.json());
app.use("/api", user);
app.use("/api", Book);
app.use("/api", favourite);

connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
