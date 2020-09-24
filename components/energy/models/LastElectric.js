const { DataTypes, Model } = require("sequelize");
const config = require("../../../config");
const sequelize = require("../../../database/connection");

class LastElectric extends Model {}

LastElectric.init(
  {
    timeRegister: {
      type: DataTypes.DATE,
      field: "tiem_register",
    },
    timeUpdate: {
      type: DataTypes.DATE,
      field: "tiem_update",
    },
    watts: {
      type: DataTypes.FLOAT,
      field: "watts",
    },
    kwHour: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue("watts") / 1000;
      },
    },
    cost: {
      type: DataTypes.VIRTUAL,
      get() {
        return (this.getDataValue("watts") / 1000) * 0.36;
      },
    },
  },
  {
    sequelize,
    modelName: "LastElectric",
    timestamps: false,
    tableName: config.tables.lastElectric,
  }
);
module.exports = LastElectric;
