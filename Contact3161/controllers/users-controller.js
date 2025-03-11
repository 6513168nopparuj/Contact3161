const jwt = require("jsonwebtoken");
const md5 = require("md5");

const { validationResult } = require("express-validator");

const User = require("../models/userModel");

const HttpError = require("../models/http-errors");

const getUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, "-password");
    } catch (err) {
        const error = new HttpError(
            "Fetching users failed, please try again later.",
            500
        );
        return next(error);
    }
    res.json({
        users: users.map((user) => user.toObject({ getters: true })),
    });
};

const createContact = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError("Invalid inputs passed, please check your data", 422)
        );
    }

    const {
        cid,
        firstname,
        lastname,
        mobile,
        email,
        password,
        facebook,
        imageUrl,
    } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ cid: cid });
    } catch (err) {
        const error = new HttpError(
            "Signing up failed, please try again later.",
            500
        );
        return next(error);
    }
    if (existingUser) {
        const error = new HttpError(
            "User exists already, please login instead.",
            422
        );
        return next(error);
    }

    const hashedPassword = md5(password);

    const createdUser = new User({
        cid,
        firstname,
        lastname,
        mobile,
        email: email || "",
        password: hashedPassword,
        facebook: facebook || "",
        imageUrl: imageUrl || "",
    });

    try {
        console.log("Saving user to database...");
        await createdUser.save();
        console.log("User saved successfully!");
    } catch (err) {
        console.error("Error saving user:", err);
        const error = new HttpError(
            "Signing up failed, please try again.",
            500
        );
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
            {
                userId: createdUser.id,
                email: createdUser.email,
            },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
        );
    } catch (err) {
        const error = new HttpError(
            "Signing up failed, please try again.",
            500
        );
        return next(error);
    }

    res.status(201).json({
        cid: createdUser.cid,
        firstname: createdUser.firstname,
        lastname: createdUser.lastname,
        email: createdUser.email,
        mobile: createdUser.mobile,
        facebook: createdUser.facebook,
        imageUrl: createdUser.imageUrl,
        token: token,
    });
};

exports.getUsers = getUsers;
exports.createContact = createContact;
