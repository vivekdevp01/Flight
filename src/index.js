const express = require("express");
// const { PORT } = require("./config/server-config");

const app = express();
const apiRoutes = require("./routes");
const { ServerConfig, LoggerConfig } = require("./config");
const { where } = require("sequelize");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);
app.use("/flightsService/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Server is running on port ${ServerConfig.PORT}`);
  LoggerConfig.info("Successfully started", "root", {});
});
