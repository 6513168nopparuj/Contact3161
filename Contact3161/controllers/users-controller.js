var express = require("express");
var app = express();
require("dotenv").config();

const HttpError = require("../models/http-errors");

var { MongoClient } = require("mongodb");
var url = `mongodb+srv://jarupatsk2546:${process.env.DB_PASSWORD}@contactlist.e400e.mongodb.net/?retryWrites=true&w=majority&appName=ContactList`;
const dbName = "ContactList";

const connectDB = async () => {
    try {
        const client = new MongoClient(url, { useUnifiedTopology: true });
        await client.connect();
        console.log("Connected to MongoDB successfully!");
        dbo = client.db(dbName);
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1);
    }
};

connectDB().then(() => {
    app.listen(8081, () => {
        console.log("Server is running at https://localhost:8081")
    })
})