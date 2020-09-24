const config = require("../config");
const Sequelize = require("sequelize");

let connection = null;
const connectDB = () => {
  if (!connection) {
    connection = new Sequelize(
      `postgres://${config.pgsql.user}:${config.pgsql.password}@${config.pgsql.host}:5432/${config.pgsql.database}`
    );

    connection
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
        return connection;
      })
      .catch((error) => {
        console.error("Unable to connect to the database:", error);
      });
  }
  return connection;
};

module.exports = connectDB();
