// routes/user.js
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

router.get("/", async (req, res) => {
    try {
        const userEmail = req.query.email;

        if (!userEmail) {
            return res.status(400).json({ message: "Email parameter is required" });
        }

        const user = await User.findOne({ where: { email: userEmail } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userDetails = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };

        res.json(userDetails);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.put("/:email", async (req, res) => {
    try {
        const userEmail = req.params.email;
        const updatedUserData = req.body;

        const user = await User.findOne({ where: { email: userEmail } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await User.update(updatedUserData, { where: { email: userEmail } });

        res.json({ message: "Data updated successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
