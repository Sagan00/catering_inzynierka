const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("ctering", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const Meal = sequelize.define(
  "Meal",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    protein: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    carbo: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fat: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    calories: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    portion: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { Meal, sequelize };
