const jwt = require("jsonwebtoken");
const md5 = require("md5");

const { validationResult } = require("express-validator");

const User = require("../models/userModel");

const HttpError = require("../models/http-errors");

const getUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({});
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

const getUserId = async (req, res, next) => {
    const cid = req.params.cid;
    let user;
    try {
        user = await User.findOne({ cid: cid }, "-password");
    } catch (err) {
        const error = new HttpError(
            "Something went wrong, could not find a user.",
            500
        );
        return next(error);
    }
    res.json({ user: user.toObject({ getters: true }) });
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

    const createdUser = new User({
        cid,
        firstname,
        lastname,
        mobile,
        email: email || "",
        facebook: facebook || "",
        imageUrl: imageUrl || "",
    });

    try {
        await createdUser.save();
    } catch (err) {
        console.error("Error saving user:", err);
        const error = new HttpError(
            "Signing up failed, please try again.",
            500
        );
        return next(error);
    }

    // let token;
    // try {
    //     token = jwt.sign(
    //         {
    //             userId: createdUser.id,
    //             email: createdUser.email,
    //         },
    //         process.env.JWT_KEY,
    //         { expiresIn: "1h" }
    //     );
    // } catch (err) {
    //     const error = new HttpError(
    //         "Signing up failed, please try again.",
    //         500
    //     );
    //     return next(error);
    // }

    res.status(201).json({
        cid: createdUser.cid,
        firstname: createdUser.firstname,
        lastname: createdUser.lastname,
        email: createdUser.email,
        mobile: createdUser.mobile,
        facebook: createdUser.facebook,
        imageUrl: createdUser.imageUrl,
        // token: token,
    });
};

// const login = async (req, res, next) => {
//     const { username, password } = req.body;
//     let existingUser;
//     try {
//         existingUser = await User.findOne({ firstname: username });
//     } catch (err) {
//         const error = new HttpError(
//             "Login failed, please try again later.",
//             500
//         );
//         return next(error);
//     }
//     if (!existingUser) {
//         const error = new HttpError(
//             "Invalid credentials, could not log you in.",
//             403
//         );
//         return next(error);
//     }

//     let isValidPassword = false;
//     let currentPassword = md5(password);
//     try {
//         isValidPassword = existingUser.password === currentPassword;
//     } catch (err) {
//         const error = new HttpError(
//             "Could not log you in, please check your credentials and try again.",
//             500
//         );
//         return next(error);
//     }
//     if (!isValidPassword) {
//         const error = new HttpError(
//             "Invalid credentials, could not log you in.",
//             403
//         );
//         return next(error);
//     }

//     let token;
//     try {
//         token = jwt.sign(
//             {
//                 userId: existingUser.id,
//                 email: existingUser.email,
//             },
//             process.env.JWT_KEY,
//             { expiresIn: "1h" }
//         );
//     } catch (err) {
//         const error = new HttpError(
//             "Logging in failed, please try again.",
//             500
//         );
//         return next(error);
//     }

//     res.json({ result: "true" });
// };

const updateContact = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError("Invalid inputs passed, please check your data", 422)
        );
    }

    const oldCid = req.params.cid;
    const {
        cid: newCid,
        firstname,
        lastname,
        mobile,
        email,
        facebook,
        imageUrl,
    } = req.body;

    let user;
    try {
        user = await User.findOne({ cid: oldCid });
    } catch (err) {
        return next(
            new HttpError("Something went wrong, could not update user.", 500)
        );
    }

    if (!user) {
        return next(new HttpError("User not found.", 404));
    }

    // if (user.cid !== req.userData.cid) {
    //     return next(
    //         new HttpError("You are not allowed to edit this user.", 401)
    //     );
    // }

    if (newCid !== oldCid) {
        let existingUser;
        try {
            existingUser = await User.findOne({ cid: newCid });
        } catch (err) {
            return next(
                new HttpError(
                    "Something went wrong, could not check user.",
                    500
                )
            );
        }

        if (existingUser) {
            return next(new HttpError("The new CID is already in use.", 409));
        }

        user.cid = newCid;
    }

    user.firstname = firstname;
    user.lastname = lastname;
    user.mobile = mobile;
    user.email = email;
    user.facebook = facebook;
    user.imageUrl = imageUrl;

    try {
        console.log("Updating user in database...");
        await user.save();
        console.log("User updated successfully!");
    } catch (err) {
        return next(
            new HttpError("Something went wrong, could not update user.", 500)
        );
    }

    res.status(200).json({
        cid: user.cid,
        firstname: user.firstname,
        lastname: user.lastname,
        mobile: user.mobile,
        email: user.email,
        facebook: user.facebook,
        imageUrl: user.imageUrl,
    });
};

const deleteContact = async (req, res, next) => {
    const cid = req.params.cid;
    let user;
    try {
        user = await User.findOne({ cid: cid });
    } catch (err) {
        const error = new HttpError(
            "Something went wrong, could not delete user.",
            500
        );
        return next(error);
    }
    if (!user) {
        const error = new HttpError("Could not find user for this id.", 404);
        return next(error);
    }

    // if (user.cid !== req.userData.cid) {
    //     const error = new HttpError("You are not allowed to delete this user.", 401);
    //     return next(error);
    // }

    try {
        console.log("Deleting user from database...");
        await user.deleteOne();
        console.log("User deleted successfully!");
    } catch (err) {
        const error = new HttpError(
            "Something went wrong, could not delete user.",
            500
        );
        return next(error);
    }

    res.status(200).json({
        message: "This contact has been deleted.",
        cid: cid,
        firstname: user.firstname,
        lastname: user.lastname,
    });
};

exports.getUsers = getUsers;
exports.getUserId = getUserId;
// exports.login = login;
exports.createContact = createContact;
exports.updateContact = updateContact;
exports.deleteContact = deleteContact;
