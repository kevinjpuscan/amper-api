const LastElectric = require("../models/LastElectric");
const response = require("../../../network/response");
const { validate } = require("../../../hooks");

async function getLastElectric(req, res, next) {
  try {
    const energy = await LastElectric.findOne({ limit: 1 });
    response.success(req, res, energy, 200);
  } catch (error) {
    response.error(req, res);
  }
}

module.exports = getLastElectric;
