const mongoose = require("mongoose");

const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-High-Quality-Image.png",
    },
    role:[
        {
            type: String,
            default: "user",
            enum: ["user", "admin"]
        },
    ],
    favourites:[
        {
            type: mongoose.Types.ObjectId,
            ref: "books",
        },
    ],
    cart:[
        {
            type: mongoose.Types.ObjectId,
            ref: "books",
        },
    ],
    order:[
        {
            type: mongoose.Types.ObjectId,
            ref: "order",
        },
    ],
},
{
    timestamps: true,
});
module.exports = mongoose.model("users", user);