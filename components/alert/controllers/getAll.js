const Alert = require("../models/Alert");
const response = require("../../../network/response");
const { validate } = require("../../../hooks");
const config = require("../../../config");

async function getAll(req, res, next) {
  try {
    let { page, count } = req.query;

    const alertList = await Alert.findAll({
      order: [["id", "DESC"]],
      limit: count,
      offset: (page - 1) * count,
    });

    response.success(req, res, alertList, 200);
  } catch (error) {
    response.error(req, res);
  }
}

module.exports = getAll;
