const jwt = require("jsonwebtoken");
const md5 = require("md5");

const HttpError = require("../models/http-errors");

const Login = require("../models/loginModel");

const login = async (req, res, next) => {
    const { username, password } = req.body;
    let existingUser;
    try {
        existingUser = await Login.findOne({ username: username });
    } catch (err) {
        const error = new HttpError(
            "Login failed, please try again later.",
            500
        );
        return next(error);
    }

    if (!existingUser) {
        const error = new HttpError(
            "Invalid credentials, could not log you in.",
            403
        );
        return next(error);
    }

    let isValidPassword = false;
    let currentPassword = md5(password);
    try {
        isValidPassword = existingUser.password === currentPassword;
    } catch (err) {
        const error = new HttpError(
            "Could not log you in, please check your credentials and try again.",
            500
        );
        return next(error);
    }

    if (!isValidPassword) {
        const error = new HttpError(
            "Invalid credentials, could not log you in.",
            403
        );
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
            {
                userId: existingUser.id,
                username: existingUser.username,
            },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
        );
        return res.json({ token: token, result: "true" });
    } catch (err) {
        const error = new HttpError(
            "Logging in failed, please try again.",
            500
        );
        return next(error);
    }
};

const signup = async (req, res, next) => {
    const { username, password } = req.body;
    let existingUser;
    try {
        existingUser = await Login.findOne({ username: username });
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

    let hashedPassword = md5(Number(password));
    const createdUser = new Login({
        username,
        password: hashedPassword,
    });
    try {
        await createdUser.save();
    } catch (err) {
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
                username: createdUser.username,
            },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
        );
    } catch (err) {
        const error = new HttpError(
            "Could not create token, please try again.",
            500
        );
        return next(error);
    }
    res.status(201).json({
        token: token,
        message: "Created User successfully",
    });
};

exports.login = login;
exports.signup = signup;
