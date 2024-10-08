const { Schema, model } = require("../connection");

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
    },

    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = model("userscollection", userSchema);

module.exports = User;