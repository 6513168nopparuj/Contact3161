const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        cid: { type: String, required: true },
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        mobile: { type: String, required: true },
        password: { type: String, required: true, minlength: 6 },
        email: { type: String, default: "" },
        facebook: { type: String, default: "" },
        imageUrl: { type: String, default: "" },
    },
    {
        versionKey: false,
        collection: "Contacts",
    }
);

module.exports = mongoose.model("Contacts", userSchema);
