const express = require("express");
const router = express.Router();

const { authanticateToken } = require("./userAuth");
const User = require("../models/user");

router.put("/addToFavourite", authanticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;

        const userData = await User.findById(id);

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const isBookInFavourite = userData.favouriteBooks.some(
            (id) => id.toString() === bookid
        );

        if (isBookInFavourite) {
            return res.status(200).json({
                message: "Book is already in favourites"
            });
        }

        await User.findByIdAndUpdate(id, {
            $push: { favouriteBooks: bookid }
        });

        res.status(200).json({
            message: "Book added to favourites successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.delete("/removeFromFavourite", authanticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;

        const userData = await User.findById(id);

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const isBookInFavourite = userData.favouriteBooks.some(
            (id) => id.toString() === bookid
        );

        if (!isBookInFavourite) {
            return res.status(200).json({
                message: "Book is not in favourites"
            });
        }

        await User.findByIdAndUpdate(id, {
            $pull: { favouriteBooks: bookid }
        });

        res.status(200).json({
            message: "Book removed from favourites successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.get("/getFavouriteBooks", authanticateToken, async (req, res) => {
    try {
        const { id } = req.headers;

        const userData = await User.findById(id)
            .populate("favouriteBooks");

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            status: "success",
            data: userData.favouriteBooks
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
