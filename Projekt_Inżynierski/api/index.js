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
const { User } = require("./models/user");
const { Address } = require("./models/address");
const { Meal } = require("./models/meal");
const { Menu } = require("./models/menu");
const { Orders } = require("./models/orders");
const { Form } = require("./models/form");

//middleware
app.use(express.json());
app.use(cors());
User.sync()
  .then(() => {
    console.log(
      "Tabela Users została utworzona lub zsynchronizowana z bazą danych."
    );
  })
  .catch((error) => {
    console.error("Błąd synchronizacji tabeli:", error);
  });

Address.sync()
  .then(() => {
    console.log(
      "Tabela Address została utworzona lub zsynchronizowana z bazą danych."
    );
  })
  .catch((error) => {
    console.error("Błąd synchronizacji tabeli:", error);
  });

Meal.sync()
  .then(() => {
    console.log(
      "Tabela Meals została utworzona lub zsynchronizowana z bazą danych."
    );
  })
  .catch((error) => {
    console.error("Błąd synchronizacji tabeli:", error);
  });
Menu.sync()
  .then(() => {
    console.log(
      "Tabela Menu została utworzona lub zsynchronizowana z bazą danych."
    );
  })
  .catch((error) => {
    console.error("Błąd synchronizacji tabeli:", error);
  });
Orders.sync()
  .then(() => {
    console.log(
      "Tabela Orders została utworzona lub zsynchronizowana z bazą danych."
    );
  })
  .catch((error) => {
    console.error("Błąd synchronizacji tabeli:", error);
  });
Form.sync()
  .then(() => {
    console.log(
      "Tabela Form została utworzona lub zsynchronizowana z bazą danych."
    );
  })
  .catch((error) => {
    console.error("Błąd synchronizacji tabeli:", error);
  });

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/mealsList", mealsList);
app.use("/api/menu", menuRoutes);
app.use("/api/user", userAccountRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/cart_meals", cartMeals);
app.use("/api/contactForm", contactForm);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Nasłuchiwanie na porcie ${port}`));
