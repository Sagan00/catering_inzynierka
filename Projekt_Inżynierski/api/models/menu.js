const { Sequelize, DataTypes } = require("sequelize");
const { Meal } = require("./meal");
const sequelize = new Sequelize("ctering", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const Menu = sequelize.define('Menu', {
    dietName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_breakfast: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Meals',
        key: 'id',
      },
    },
    id_seccond_breakfast: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Meals',
        key: 'id',
      },
    },
    id_lunch: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Meals',
        key: 'id',
      },
    },
    id_dinner: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Meals',
        key: 'id',
      },
    },
    id_supper: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Meals',
        key: 'id',
      },
    },
  });
  
  Menu.belongsTo(Meal, { foreignKey: 'id_breakfast', as: 'breakfast' });
  Menu.belongsTo(Meal, { foreignKey: 'id_seccond_breakfast', as: 'secondBreakfast' });
  Menu.belongsTo(Meal, { foreignKey: 'id_lunch', as: 'lunch' });
  Menu.belongsTo(Meal, { foreignKey: 'id_dinner', as: 'dinner' });
  Menu.belongsTo(Meal, { foreignKey: 'id_supper', as: 'supper' });
  
  module.exports = { Menu };