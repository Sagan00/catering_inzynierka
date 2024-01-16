const express = require("express");
const router = express.Router();
const { Meal } = require("../models/meal");

router.get("/", async (req, res) => {
    try {
        const allMeals = await Meal.findAll();

        if (allMeals.length === 0) {
            return res.status(404).json({ message: "Meals not found" });
        }

        const mealDetails = allMeals.map((meal) => ({
            id: meal.id,
            name: meal.name,
            description: meal.description,
            category: meal.category,
            price: meal.price,
            image: meal.image,
            protein: meal.protein,
            carbo: meal.carbo,
            fat: meal.fat,
            calories: meal.calories,
            portion: meal.portion,
        }));

        res.json(mealDetails);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.delete('/:mealId', async (req, res) => {
  try {
    // Pobierz identyfikator potrawy z parametru ścieżki
    const mealId = req.params.mealId;

    // Sprawdź, czy potrawa istnieje w bazie danych
    const existingMeal = await Meal.findByPk(mealId);

    if (!existingMeal) {
      return res.status(404).json({ message: 'Meal not found' });
    }

    // Usuń potrawę z bazy danych
    await existingMeal.destroy();

    // Odpowiedz klientowi z potwierdzeniem usunięcia
    res.json({ message: 'Meal deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
router.post('/', async (req, res) => {
  try {
    // Pobierz dane potrawy z ciała żądania
    const newMealData = req.body;

    // Dodaj nową potrawę do bazy danych
    const newMeal = await Meal.create(newMealData);

    // Odpowiedz klientowi z dodaną potrawą
    res.status(201).json(newMeal);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
router.put("/:id", async (req, res) => {
    const mealId = req.params.id;
    const updatedMealData = req.body;
  
    try {
      // Sprawdź, czy posiłek istnieje
      const existingMeal = await Meal.findByPk(mealId);
  
      if (!existingMeal) {
        return res.status(404).json({ message: "Posiłek nie został znaleziony." });
      }
  
      // Aktualizuj dane posiłku
      await existingMeal.update(updatedMealData);
  
      // Zwróć zaktualizowane dane
      res.json(existingMeal);
    } catch (error) {
      console.error("Błąd podczas aktualizacji posiłku:", error);
      res.status(500).json({ message: "Wewnętrzny błąd serwera" });
    }
  });
module.exports = router;