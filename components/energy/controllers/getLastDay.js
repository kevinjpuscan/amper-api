const Energy = require("../models/Energy");
const response = require("../../../network/response");
const { validate } = require("../../../hooks");
const config = require("../../../config");

async function getLastDay(req, res, next) {
  try {
    Energy.tableName = config.tables.lastDay;

    const energyList = await Energy.findAll();

    response.success(req, res, energyList, 200);
  } catch (error) {
    response.error(req, res);
  }
}

module.exports = getLastDay;
