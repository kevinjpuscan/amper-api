const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../database/connection");
const config = require("../../../config");

class Alert extends Model {}

Alert.init(
  {
    timeStart: {
      type: DataTypes.DATE,
      field: "timestart",
    },
    timeEnd: {
      type: DataTypes.DATE,
      field: "timeend",
    },
    watts: {
      type: DataTypes.FLOAT,
    },
    target: {
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize,
    modelName: "Alert",
    timestamps: false,
    tableName: config.tables.alerts,
  }
);
module.exports = Alert;
