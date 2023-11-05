require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const menuRoutes = require("./routes/menu")
const { User } = require("./models/user");
const { Meal } = require("./models/meal");

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
Meal.sync()
.then(() => {
  console.log(
    "Tabela Meals została utworzona lub zsynchronizowana z bazą danych."
  );
})
.catch((error) => {
  console.error("Błąd synchronizacji tabeli:", error);
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Nasłuchiwanie na porcie ${port}`));
