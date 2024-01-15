// routes/contactForm.js
const express = require("express");
const router = express.Router();
const { Form } = require("../models/form");
const { User } = require("../models/user");

router.post("/", async (req, res) => {
  try {
    const userEmail = req.headers.authorization;

    if (!userEmail) {
      return res.status(400).json({ message: "User email not provided in the token" });
    }

    const user = await User.findOne({ where: { email: userEmail } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { topic, description } = req.body;

    if (!topic || !description) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const newFormEntry = await Form.create({
      userId: user.id,
      topic,
      description,
    });

    res.json(newFormEntry);
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
