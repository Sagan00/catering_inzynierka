const express = require("express");
const router = express.Router();
const { Sequelize, DataTypes } = require("sequelize");
const { Menu } = require("../models/menu");
const { Meal } = require("../models/meal");
const { Orders } = require("../models/orders");
router.post("/", async (req, res) => {
    try {
        const idOrder = req.body.id_order;
    
        // Pobierz dane z tabeli Orders
        const orderData = await Orders.findByPk(idOrder, {
          include: [
            {
              model: Menu,
              as: 'menu',
              include: [
                { model: Meal, as: "breakfast" },
                { model: Meal, as: "secondBreakfast" },
                { model: Meal, as: "lunch" },
                { model: Meal, as: "dinner" },
                { model: Meal, as: "supper" },
              ],
            },
          ],
        });
    
        if (!orderData) {
          return res.status(404).json({ message: "Order not found" });
        }
    
        // Uzyskaj nazwy produktów z poszczególnych posiłków
        const mealNames = {
          breakfast: orderData.menu.breakfast.name,
          breakfast_img: orderData.menu.breakfast.image,
          secondBreakfast: orderData.menu.secondBreakfast.name,
          secondBreakfast_img: orderData.menu.secondBreakfast.image,
          lunch: orderData.menu.lunch.name,
          lunch_img: orderData.menu.lunch.image,
          dinner: orderData.menu.dinner.name,
          dinner_img: orderData.menu.dinner.image,
          supper: orderData.menu.supper.name,
          supper_img: orderData.menu.supper.image,
          menu_name: orderData.menu.supper.category,
        };
    
        res.json(mealNames);
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
});

module.exports = router;
