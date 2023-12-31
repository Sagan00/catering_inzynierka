const express = require("express");
const router = express.Router();
const { Form } = require("../models/form");

router.post("/", async (req, res) => {
  try {
    const { email, topic, description } = req.body;

    if (!email || !topic || !description) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const newFormEntry = await Form.create({
      email,
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