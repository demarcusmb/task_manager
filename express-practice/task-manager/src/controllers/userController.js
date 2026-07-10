const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/Users");
console.log(User);
// ======================
// CREATE A NEW USER
// ======================

router.post("/users/register", async (req,res) =>{
    try {
        // Extract the title from the request body
        // Example: { "title": "Learn Express" }
        const { userName, password, email } = req.body;

        // Validate that a userName was provided
        if (!userName) {
            return res.status(400).json({
                message: "User name is required"
            });
        }

        // Validate that password was provided
        if (!password) {
            return res.status(400).json({
                message: "Password is required"
            });
        }

        // Hashing password to store in database
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create ({
            name: userName,
            password: hashedPassword,
            email
        });

        // Return the newly created task with HTTP status 201 (Created)
        res.status(201).json(user);

    } catch (error) {
        // Pass unexpected errors to the global error handler
        res.status(400).json(error);
    }
})

// ======================
// LOGIN TO USER
// ======================

router.post("/users/login", async (req, res) => {
    try {
        const { name, password } = req.body;

        const user = await User.findOne({ name });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const passwordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordCorrect) {
            return res.status(400).json({
                message: "Incorrect password"
            });
        }

        res.status(200).json({
            message: "Login successful",
            userId: user._id
        });

    } catch (error) {
        res.status(500).json(error);
    }
});