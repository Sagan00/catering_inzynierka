const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const { Menu } = require("../models/menu");
const { Orders } = require("../models/orders");
const { OrdersPaid } = require("../models/orders_paid");

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
          });

          console.log("Nowe zamówienie utworzone:", newOrder);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  router.put("/update", async (req, res) => {
    try {
       const orderId = req.body.id_order;
      const totalCost = req.body.total_cost;
      const startDate = req.body.start_date;
      const endDate = req.body.end_date;
      const orderToModify = await Orders.findByPk(orderId);
  
      if (!orderToModify) {
        return res.status(404).json({ message: "Order not found" });
      }
        const id_menu = orderToModify.id_menu;
        const id_user = orderToModify.id_user;

          const newOrder = await OrdersPaid.create({
            id_menu: id_menu,
            id_user: id_user,
            total_cost: totalCost,
            start_date: startDate,
            end_date: endDate,
          }); /**/

          console.log("Nowe zamówienie utworzone:",newOrder);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error e" });
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