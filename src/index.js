const express = require("express");
// const { PORT } = require("./config/server-config");

const app = express();
const apiRoutes = require("./routes");
const { ServerConfig, LoggerConfig } = require("./config");
const { where } = require("sequelize");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Server is running on port ${ServerConfig.PORT}`);
  LoggerConfig.info("Successfully started", "root", {});
  // bad code
  const { City, Airport } = require("./models");
  const Delhi = await City.findByPk(6);
  // console.log(city);
  // const airport = await Airport.create({
  //   name: "Delhi airport",
  //   code: "DEL",
  //   cityId: 6,
  // });
  // const airport = await Delhi.createAirport({
  //   name: "New-delhi-Airport",
  //   code: "Dlh",
  // });
  // console.log(airport);
  // const airports = await Delhi.getAirports();
  // console.log(airports);
  // const airport = await Airport.findByPk(3);
  // console.log(airport);
  // await Delhi.removeAirport(airport);
  await City.destroy({
    where: {
      id: 6,
    },
  });
});
