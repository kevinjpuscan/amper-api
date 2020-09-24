module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "notasecret!",
  },
  pgsql: {
    host: process.env.PGSQL_HOST || "192.168.100.15",
    user: process.env.PGSQL_USER || "postgres",
    password: process.env.PGSQL_PASS || "nomeacuerdo",
    database: process.env.PGSQL_DB || "amperdb",
  },
  tables: {
    byMonth: process.env.TABLES_BY_MONTH || "by_month",
    byDay: process.env.TABLES_BY_DAY || "by_day",
    byHour: process.env.TABLES_BY_HOUR || "by_hour",
    lastDay: process.env.LAST_DAY || "last_day",
    lastElectric: process.env.LAST_ELECTRIC || "tp_last_electric",
    alerts: process.env.ALERTS || "tp_alerts",
  },
};
