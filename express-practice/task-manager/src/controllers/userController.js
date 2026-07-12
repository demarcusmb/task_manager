const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/Users");

exports.register = async (req, res) => {
    try {
        const { userName, password, email } = req.body;

        if (!userName) {
            return res.status(400).json({ message: "User name is required" });
        }

        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            userName,
            password: hashedPassword,
            email
        });

        res.status(201).json(user);

    } catch (error) {
        res.status(400).json(error);
    }
};

exports.login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        const user = await User.findOne({ userName });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const passwordCorrect = await bcrypt.compare(password, user.password);

        if (!passwordCorrect) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = jwt.sign(
            {
                id: user._id,
                userName: user.userName
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1h"
            }
        )

        res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {
        res.status(500).json(error);
    }
};