const express = require("express");
const router = express.Router();
const {authanticateToken}  = require("./userAuth");

router.put("/addToFavourite", authanticateToken, async (req, res) => {
    try {
        const {bookid,id} = req.headers;
        const userData = await User.findById(id);
        const isBookInFavourite = userData.favouriteBooks.includes(bookid);
        if (isBookInFavourite) {
            return res.status(200).json({ message: "Book is already in favourites" });
        }   
        await User.findByIdAndUpdate(id, { $push: { favouriteBooks: bookid } });
        res.status(200).json({ message: "Book added to favourites successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
 
router.delete("/removeFromFavourite", authanticateToken, async (req, res) => {
    try{
        const {bookid,id} = req.headers;
        const userData = await User.findById(id);
        const isBookInFavourite = userData.favouriteBooks.includes(bookid);
        if (!isBookInFavourite) {
            return res.status(200).json({ message: "Book is not in favourites" });
        }
        await User.findByIdAndUpdate(id, { $pull: { favouriteBooks: bookid } });
        res.status(200).json({ message: "Book removed from favourites successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
        


module.exports = router;