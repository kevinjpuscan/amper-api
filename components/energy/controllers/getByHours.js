const Energy = require("../models/Energy");
const response = require("../../../network/response");
const { validate } = require("../../../hooks");
const config = require("../../../config");

async function getByHours(req, res, next) {
  try {
    Energy.tableName = config.tables.byHour;

    let year = req.params.year;
    if (!validate.isValidYear(year)) {
      response.error(req, res, "No es un año valido", 400);
    }

    let month = req.params.month;
    if (!validate.isValidYear(month)) {
      response.error(req, res, "No es un día valido", 400);
    }

    let day = req.params.day;
    if (!validate.isValidYear(day)) {
      response.error(req, res, "No es un día valido", 400);
    }

    const energyList = await Energy.findAll({
      where: {
        year,
        month,
        day,
      },
    });

    response.success(req, res, energyList, 200);
  } catch (error) {
    response.error(req, res);
  }
}

module.exports = getByHours;
