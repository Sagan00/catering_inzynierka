// routes/account.js
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const { Address } = require("../models/address");

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

// Dodaj endpoint do dodawania adresów
router.route("/address")
    .get(async (req, res) => {
        try {
            const userEmail = req.headers.authorization;

            if (!userEmail) {
                return res.status(400).json({ message: "User email not provided in the token" });
            }

            const user = await User.findOne({ where: { email: userEmail } });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const userAddress = await Address.findOne({ where: { id: user.addressId } });

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
                return res.status(400).json({ message: "User email not provided in the token" });
            }

            const user = await User.findOne({ where: { email: userEmail } });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const userAddress = await Address.findOne({ where: { id: user.addressId } });

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
    
module.exports = router;
