const express = require("express");
const router = express.Router();

// Controllers
const { getAll } = require("./controllers");

// Routes
router.get("/", getAll);

module.exports = router;
