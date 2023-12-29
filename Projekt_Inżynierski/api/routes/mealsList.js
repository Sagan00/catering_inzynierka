const express = require("express");
const router = express.Router();
const { Meal } = require("../models/meal");

router.get("/", async (req, res) => {
    try {
        // Get all meals from the Meals table
        const allMeals = await Meal.findAll();

        if (allMeals.length === 0) {
            return res.status(404).json({ message: "Meals not found" });
        }

        // Extract necessary details for each meal
        const mealDetails = allMeals.map((meal) => ({
            name: meal.name,
            calories: meal.calories,
        }));

        res.json(mealDetails);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
module.exports = router;