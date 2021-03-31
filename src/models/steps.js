"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class steps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ tasks }) {
      // define association here
      this.belongsTo(tasks, { foreignKey: "taskId", as: "tasks" });
    }
  }
  steps.init(
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "steps",
    }
  );
  return steps;
};
