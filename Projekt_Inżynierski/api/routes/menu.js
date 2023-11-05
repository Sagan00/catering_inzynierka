const router = require("express").Router();
const { Meal } = require("../models/meal");
router.get('/', async (req, res) => {
  try {
    const meals = await Meal.findAll();
    res.json(meals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch meals' });
  }
});

module.exports = router;
