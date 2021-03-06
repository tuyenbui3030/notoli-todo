"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ tasks }) {
      // define association here
      this.hasMany(tasks, { foreignKey: "userId", as: "tasks" });
    }
  }
  users.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: DataTypes.STRING,
      role: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      verify: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
