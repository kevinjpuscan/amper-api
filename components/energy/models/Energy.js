const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../database/connection");

class Energy extends Model {}

Energy.init(
  {
    timeRegister: {
      type: DataTypes.DATE,
      field: "tiem_register",
    },
    wattsHour: {
      type: DataTypes.FLOAT,
      field: "wh",
    },
    kwHour: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue("wattsHour") / 1000;
      },
    },
    cost: {
      type: DataTypes.VIRTUAL,
      get() {
        return (this.getDataValue("wattsHour") / 1000) * 0.36;
      },
    },
  },
  {
    sequelize,
    modelName: "Energy",
    timestamps: false,
  }
);
Energy.removeAttribute("id");
module.exports = Energy;
