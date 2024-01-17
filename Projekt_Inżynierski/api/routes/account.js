// routes/account.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const { Address } = require("../models/address");
const { OrdersPaid } = require("../models/orders_paid");
const { Menu } = require("../models/menu");

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
      phoneNumber: user.phoneNumber,
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

//Zmiana hasła
router.put("/changePassword/:email", async (req, res) => {
  try {
    const userEmail = req.params.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const user = await User.findOne({ where: { email: userEmail } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Sprawdź, czy stare hasło jest poprawne
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Nieprawidłowe stare hasło" });
    }

    // Zaktualizuj hasło
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//wczytanie telefonu i modyfikacja
router
  .route("/phone")
  .get(async (req, res) => {
    try {
      const userEmail = req.headers.authorization;

      if (!userEmail) {
        return res
          .status(400)
          .json({ message: "User email not provided in the token" });
      }

      const user = await User.findOne({ where: { email: userEmail } });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ phoneNumber: user.phoneNumber });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
  .put(async (req, res) => {
    try {
      const updatedPhoneNumber = req.body.phoneNumber;
      const userEmail = req.headers.authorization;

      if (!userEmail) {
        return res
          .status(400)
          .json({ message: "User email not provided in the token" });
      }

      const user = await User.findOne({ where: { email: userEmail } });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await User.update(
        { phoneNumber: updatedPhoneNumber },
        { where: { email: userEmail } }
      );

      res.json({ message: "Phone number updated successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

// Dodaj endpoint do dodawania adresów
router
  .route("/address")
  .get(async (req, res) => {
    try {
      const userEmail = req.headers.authorization;

      if (!userEmail) {
        return res
          .status(400)
          .json({ message: "User email not provided in the token" });
      }

      const user = await User.findOne({ where: { email: userEmail } });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const userAddress = await Address.findOne({
        where: { id: user.addressId },
      });

      res.json(userAddress);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
  .post(async (req, res) => {
    try {
      const newAddressData = req.body;
      const userEmail = req.headers.authorization;

      if (!userEmail) {
        return res
          .status(400)
          .json({ message: "User email not provided in the token" });
      }

      const user = await User.findOne({ where: { email: userEmail } });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const userAddress = await Address.findOne({
        where: { id: user.addressId },
      });

      if (userAddress) {
        // Jeśli adres istnieje, zaktualizuj go
        await userAddress.update(newAddressData);
      } else {
        // Jeśli adres nie istnieje, stwórz nowy i powiąż z użytkownikiem
        const createdAddress = await Address.create(newAddressData);
        await user.update({ addressId: createdAddress.id });
      }

      res.json({ message: "Address added/updated successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

//Historia zamówień
router.get("/ordersHistory", async (req, res) => {
  try {
    const userEmail = req.headers.authorization;

    if (!userEmail) {
      return res
        .status(400)
        .json({ message: "User email not provided in the token" });
    }

    const user = await User.findOne({ where: { email: userEmail } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userOrders = await OrdersPaid.findAll({
      where: { id_user: user.id },
      include: [
        {
          model: Menu,
          as: "menu",
          attributes: ["dietName"],
        },
      ],
    });

    const orderHistory = userOrders.map((order) => ({
      id: order.id, // Dodane pole id
      dietName: order.menu.dietName,
      startDate: order.start_date,
      endDate: order.end_date,
      isActive: order.is_active,
    }));

    res.json(orderHistory);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Cancel order
router.put("/ordersHistory/:orderId/cancel", async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await OrdersPaid.findByPk(orderId, {
      include: [
        {
          model: Menu,
          as: "menu",
          attributes: ["dietName"],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update the order status to INACTIVE
    await OrdersPaid.update(
      { is_active: "INACTIVE" },
      { where: { id: orderId } }
    );

    res.json({ message: "Order cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
