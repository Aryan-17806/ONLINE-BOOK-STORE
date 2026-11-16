const express = require("express");
const router = express.Router();

const Book = require("../models/book");
const User = require("../models/user");
const { authanticateToken } = require("./userAuth");

// ADD BOOK
router.post("/addBook", authanticateToken, async (req, res) => {
    try {
        const { id } = req.headers;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }

        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            desc: req.body.description,
            price: req.body.price,
            language: req.body.language,
        });

        await book.save();

        res.status(201).json({
            message: "Book added successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// UPDATE BOOK
router.put("/updateBook", authanticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { bookid } = req.headers;

        const user = await User.findById(id);

        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }

        const updatedBook = await Book.findByIdAndUpdate(
            bookid,
            {
                url: req.body.url,
                title: req.body.title,
                author: req.body.author,
                desc: req.body.description,
                price: req.body.price,
                language: req.body.language,
            },
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({
            message: "Book updated successfully",
            book: updatedBook
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// DELETE BOOK
router.delete("/deleteBook", authanticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { bookid } = req.headers;

        const user = await User.findById(id);

        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }

        const deletedBook = await Book.findByIdAndDelete(bookid);

        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({
            message: "Book deleted successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// GET ALL BOOKS
router.get("/getAllBooks", authanticateToken, async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });

        res.status(200).json({ books });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
