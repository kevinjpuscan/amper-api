const express = require("express");
const router = express.Router();

// Controllers
const {
  getByMonths,
  getByDays,
  getByHours,
  getLastDay,
  getLastElectric,
} = require("./controllers");

// Routes
router.get("/bymonths/:year", getByMonths);
router.get("/bydays/:year/:month", getByDays);
router.get("/byhours/:year/:month/:day", getByHours);
router.get("/lastday", getLastDay);
router.get("/lastelectric", getLastElectric);

module.exports = router;
