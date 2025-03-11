const express = require("express");
const { check } = require("express-validator");

const usersControllers = require("../controllers/users-controller");

const router = express.Router();

router.get("/", usersControllers.getUsers);

router.post(
    "/createContact",
    [
        check("cid").not().isEmpty(),
        check("firstname").not().isEmpty(),
        check("lastname").not().isEmpty(),
        check("mobile").not().isEmpty(),
        check("email").normalizeEmail().isEmail(),
        check("password").not().isEmpty().isLength({ min: 6 }),
    ],
    usersControllers.createContact
);

// router.delete("/:cid", usersControllers.deleteContact);

module.exports = router;