const express = require("express");
const { check } = require("express-validator");

const usersControllers = require("../controllers/users-controller");

const router = express.Router();

// const checkAuth = require("../middleware/check-auth");

// router.post("/login", usersControllers.login);

router.get("/", usersControllers.getUsers);

router.get("/:cid", usersControllers.getUserId);

router.post(
    "/",
    [
        check("cid").not().isEmpty(),
        check("firstname").not().isEmpty(),
        check("lastname").not().isEmpty(),
        check("mobile").not().isEmpty(),
        check("email").normalizeEmail().isEmail(),
    ],
    usersControllers.createContact
);

// router.use(checkAuth);

router.patch("/:cid", usersControllers.updateContact);

router.delete("/:cid", usersControllers.deleteContact);

module.exports = router;