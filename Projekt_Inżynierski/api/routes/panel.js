// routes/panel.js
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const { Form } = require("../models/form");

// Route to get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "firstName", "lastName", "email"],
    });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint for getting messages of a specific user
router.get("/messages/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Pobierz wiadomości dla konkretnego użytkownika
    const messages = await Form.findAll({
      where: { userId },
      attributes: ["id", "topic", "description"],
    });

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
