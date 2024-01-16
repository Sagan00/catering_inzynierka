
const { Sequelize, DataTypes } = require("sequelize");
const { Menu } = require("./menu");
const { User } = require("./user");
const sequelize = new Sequelize("ctering", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const OrdersPaid = sequelize.define('OrdersPaid', {
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
    is_active: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  
  // Relacje między modelami
  OrdersPaid.belongsTo(Menu, { foreignKey: 'id_menu', as: 'menu' });
  OrdersPaid.belongsTo(User, { foreignKey: 'id_user', as: 'user', onDelete: "CASCADE"  });

  module.exports = { OrdersPaid };