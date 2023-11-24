const { Sequelize, DataTypes } = require("sequelize");
const { Menu } = require("./menu");
const { User } = require("./user");
const sequelize = new Sequelize("ctering", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const Orders = sequelize.define('Orders', {
    id_menu: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Menus',
        key: 'id',
      },
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    total_cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('DATE_ADD(CURRENT_DATE, INTERVAL 1 DAY)'),
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('DATE_ADD(CURRENT_DATE, INTERVAL 1 DAY)'),
    },
  });
  
  // Relacje między modelami
  Orders.belongsTo(Menu, { foreignKey: 'id_menu', as: 'menu' });
  Orders.belongsTo(User, { foreignKey: 'id_user', as: 'user' });

  module.exports = { Orders };