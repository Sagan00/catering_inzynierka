require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/users");
const userAccountRoutes = require("./routes/account");
const authRoutes = require("./routes/auth");
const menuRoutes = require("./routes/menu");
const orderRoutes = require("./routes/order");
const mealsList = require("./routes/mealsList");
const cartMeals = require("./routes/cartmeals");
const contactForm = require("./routes/contactform");
const panelRoutes = require("./routes/panel");
const { User } = require("./models/user");
const { Role } = require("./models/role");
const { Address } = require("./models/address");
const { Meal } = require("./models/meal");
const { Menu } = require("./models/menu");
const { Orders } = require("./models/orders");
const { OrdersPaid } = require("./models/orders_paid");
const { Form } = require("./models/form");

//middleware
app.use(express.json());
app.use(cors());
const syncAndLog = async (model, tableName) => {
  try {
    //await model.sync();
    //console.log(`Tabela ${tableName} została utworzona lub zsynchronizowana z bazą danych.`);
  } catch (error) {
    //console.error(`Błąd synchronizacji tabeli ${tableName}:`, error);
  }
};

syncAndLog(Meal, 'Meals');
syncAndLog(Menu, 'Menu');
syncAndLog(Orders, 'Orders');
syncAndLog(OrdersPaid, 'OrdersPaid');
syncAndLog(Form, 'Form');
syncAndLog(Role, 'Roles');
syncAndLog(Address, 'Address');
syncAndLog(User, 'Users');

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/mealsList", mealsList);
app.use("/api/menu", menuRoutes);
app.use("/api/account", userAccountRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/cart_meals", cartMeals);
app.use("/api/contactForm", contactForm);
app.use("/api/panel", panelRoutes);

const server = app.listen(8080, () => {
  console.log('Nasłuchiwanie na porcie 8080');
});

module.exports = server;
