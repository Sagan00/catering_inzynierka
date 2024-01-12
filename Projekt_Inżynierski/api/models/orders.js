const { Sequelize, DataTypes } = require("sequelize");
const { Menu } = require("./menu");
const { User } = require("./user");
const sequelize = new Sequelize("ctering", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const Orders = sequelize.define("Orders", {
  id_menu: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Menus",
      key: "id",
    },
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  total_cost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

// Relacje między modelami
Orders.belongsTo(Menu, { foreignKey: "id_menu", as: "menu" });
Orders.belongsTo(User, { foreignKey: "id_user", as: "user", onDelete: "CASCADE"  });

module.exports = { Orders };
