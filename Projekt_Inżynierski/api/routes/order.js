const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const { Menu } = require("../models/menu");
const { Orders } = require("../models/orders");

router.put("/", async (req, res) => {
    try {
        const userEmail = req.body.email_1;
        const totalPrice = req.body.totalPrice_1;
        const category = req.body.category_1;
        console.log("Dane otrzymane: "+userEmail+" "+totalPrice+" "+category);

        const menuRecord = await Menu.findOne({
            attributes: ['id'],
            where: {
              dietName: category,
            },
          });
      
          const userRecord = await User.findOne({
            attributes: ['id'],
            where: {
              email: userEmail,
            },
          });

          const newOrder = await Orders.create({
            id_menu: menuRecord ? menuRecord.id : null,
            id_user: userRecord ? userRecord.id : null,
            total_cost: totalPrice,
            date: new Date(), // bieżąca data i czas
          });

          console.log("Nowe zamówienie utworzone:", newOrder);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  router.post("/user_order", async (req, res) => {
    try {
      const userEmail = req.body.email_1;
  
      const userRecord = await User.findOne({
        attributes: ['id'],
        where: {
          email: userEmail,
        },
      });
  
      if (!userRecord) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const userOrders = await Orders.findAll({
        where: {
          id_user: userRecord.id,
        },
      });
  
      res.status(200).json({ userOrders });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  router.delete("/:orderId", async (req, res) => {
    try {
      const orderId = req.params.orderId;
  
      // Check if the order with the given ID exists
      const orderToDelete = await Orders.findByPk(orderId);
  
      if (!orderToDelete) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      // Delete the order
      await orderToDelete.destroy();
  
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
module.exports = router;