const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

router.get("/:email", async (req, res) => {
  try {
    const userEmail = req.params.email;
    const user = await User.findOne({ where: { email: userEmail } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Przesyłamy dane użytkownika do klienta
    res.status(200).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      // Dodaj inne pola według potrzeb
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:email", async (req, res) => {
    try {
      const userEmail = req.params.email;
      const updatedUserData = req.body;
  
      // Aktualizacja danych użytkownika w bazie
      const [updatedRowsCount] = await User.update(updatedUserData, {
        where: { email: userEmail },
      });
  
      if (updatedRowsCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User data updated successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
module.exports = router;
