const { Sequelize, DataTypes } = require("sequelize");
const { User } = require("./user");
const sequelize = new Sequelize("ctering", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const Form = sequelize.define(
  "Form",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Form.belongsTo(User, { foreignKey: "userId", as: "user" });

module.exports = { Form };
