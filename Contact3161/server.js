const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

require("dotenv").config();

const usersRoutes = require("./routes/users-routes");

app.use("/contacts", usersRoutes);

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.e400e.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=ContactList`
    )
    .then(() => {
        app.listen(8082);
        console.log("Database connected successfully!");
        console.log("Server is running at https://localhost:8081");
    })
    .catch((err) => {
        console.log("Connection failed!", err);
    });

// const connectDB = async () => {
//     try {
//         const client = new MongoClient(url, { useUnifiedTopology: true });
//         await client.connect();
//         console.log("Connected to MongoDB successfully!");
//         dbo = client.db(process.env.DB_NAME);
//     } catch (err) {
//         console.error("Database connection error:", err);
//         process.exit(1);
//     }
// };

// connectDB().then(() => {
//     app.listen(8081, () => {
//         console.log("Server is running at https://localhost:8081")
//     })
// })