const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const loginSchema = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true, minlength: 6 },
    },
    {
        versionKey: false,
        collection: "Login",
    }
);

module.exports = mongoose.model("Login", loginSchema);
