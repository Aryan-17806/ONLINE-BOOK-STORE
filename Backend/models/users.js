const e = require("express");
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
    avtar: {
        type: String,
        default: "https://www.google.com/imgres?q=default%20icon%20image&imgurl=https%3A%2F%2Fwww.pngarts.com%2Ffiles%2F10%2FDefault-Profile-Picture-PNG-High-Quality-Image.png&imgrefurl=https%3A%2F%2Fwww.pngarts.com%2Fexplore%2F215282&docid=U8aHYhJiqIlvTM&tbnid=N8QjkiknG-snmM&vet=12ahUKEwiE4Z_Y36WXAxWcjOEIHa4QNjUQnPAOegQIMhAA..i&w=762&h=980&hcb=2&ved=2ahUKEwiE4Z_Y36WXAxWcjOEIHa4QNjUQnPAOegQIMhAA",
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
    orders:[
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