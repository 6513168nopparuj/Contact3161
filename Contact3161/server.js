const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

require("dotenv").config();

const loginRoutes = require("./routes/login-routes");
const usersRoutes = require("./routes/users-routes");

app.use("/user", loginRoutes);
app.use("/contacts", usersRoutes);

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.e400e.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=ContactList`
    )
    .then(() => {
        app.listen(8082);
        console.log("Database connected successfully!");
        console.log("Server is running at https://localhost:8082");
    })
    .catch((err) => {
        console.log("Connection failed!", err);
    });
