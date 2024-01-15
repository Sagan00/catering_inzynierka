// routes/panel.js
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const { Form } = require("../models/form");
const { Orders } = require("../models/orders");
const { OrdersPaid } = require("../models/orders_paid");
const { Address } = require("../models/address");

// Route to get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "firstName", "lastName", "email", "roleId"],
      where: {
        roleId: 1, // Dodaj klauzulę, aby uwzględnić tylko użytkowników, których roleId wynosi 1 = User
      },
    });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint for deleting a specific user with related records
router.delete("/users/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Pobierz adres użytkownika
    const user = await User.findOne({ where: { id: userId } });

    if (user) {
      // Sprawdź czy użytkownik ma przypisanego adresu
      if (user.addressId) {
        // Usuń powiązany rekord z tabeli `Address`
        await Address.destroy({ where: { id: user.addressId } });
      }

      // Usuń rekordy z tabeli `orders` powiązane z użytkownikiem
      await Orders.destroy({ where: { id_user: userId } });

      // Usuń rekordy z tabeli `orderspaids` powiązane z użytkownikiem
      await OrdersPaid.destroy({ where: { id_user: userId } });

      // Usuń rekordy z tabeli `form` powiązane z użytkownikiem
      await Form.destroy({ where: { userId: userId } });

      // Usuń użytkownika
      await User.destroy({ where: { id: userId } });

      res.status(204).end(); // No content response
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
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

// Delete a specific message
router.delete("/message/:messageId", async (req, res) => {
  const messageId = req.params.messageId;

  try {
    // Delete the message with the given ID
    await Form.destroy({
      where: { id: messageId },
    });

    res.status(204).end(); // No content response
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
