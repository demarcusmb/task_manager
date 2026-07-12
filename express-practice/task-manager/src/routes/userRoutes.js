const router = require("express").Router();
const userController = require("../controllers/userController");
const User = require("../models/Users");

router.post("/users/register", userController.register);

router.post("/users/login", userController.login);

router.get("/users", async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;