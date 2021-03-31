"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ users, steps }) {
      // define association here
      this.belongsTo(users, { foreignKey: "userId", as: "users" });
      this.hasMany(steps, { foreignKey: "taskId", as: "steps" });
    }
  }
  tasks.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      myDay: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      important: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      dueDate: DataTypes.DATE,
      note: DataTypes.TEXT,
      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "tasks",
    }
  );
  return tasks;
};
