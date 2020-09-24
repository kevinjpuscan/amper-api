const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const errors = require("./network/errors");

const energy = require("./components/energy/network");
const alert = require("./components/alert/network");

const app = express();
app.use(bodyParser.json());

// ROUTES
app.use("/api/energy", energy);
app.use("/api/alert", alert);

app.use(errors);

app.listen(config.api.port, () => {
  console.log("Amper API is listening in port ", config.api.port);
});
