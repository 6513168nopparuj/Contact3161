const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    cid: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    mobile: { type: String },
    facebook: { type: String },
    imageUrl: { type: String },
});

module.exports = mongoose.model("Contacts", userSchema);