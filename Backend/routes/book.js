const express = require("express");
const router = express.Router();
const Book = require("../models/book"); 
const jwt = require('jsonwebtoken');
const {authanticateToken}  = require("./userAuth");

router.post("/addBook", authanticateToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const user = await User.findById(id); // Check if the user exists
        if (user.role !== "admin") {
            return res.status(404).json({ message: "User not found" });
        }
        const book = new Book({
            url : req.body.url,
            title : req.body.title,
            author : req.body.author,
            desc : req.body.description,
            price : req.body.price,
            language : req.body.language,
        });
        await book.save();
        res.status(201).json({ message: "Book added successfully" });

    }
    catch (error) { 
        res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/updateBook/:id", authanticateToken, async (req, res) => {
    try {
        const {bookid} = req.headers;
       // const bookId = req.params.id;
        const updatedBook = await Book.findByIdAndUpdate(bookid, {
            url : req.body.url,
            title : req.body.title,
            author : req.body.author,
            desc : req.body.description,
            price : req.body.price,
            language : req.body.language,
        });
        res.status(200).json({ message: "Book updated successfully", book: updatedBook });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/deleteBook/:id", authanticateToken, async (req, res) => {
    try {
        const {bookid} = req.headers;
        //const bookId = req.params.id;
        await Book.findByIdAndDelete(bookid);
        res.status(200).json({ message: "Book deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/getAllBooks", authanticateToken, async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.status(200).json({ books });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
