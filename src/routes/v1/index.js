const express = require("express");
// const { PingController } = require("../../controllers");
const airplaneRoutes = require("./airplane-routes");
const cityRoutes = require("./city-routes");
const router = express.Router();
const airportRoutes = require("./airport-routes");
// router.get("/ping", (req, res) => {
//   return res.json({ msg: "ok" });
// });
router.use("/airplanes", airplaneRoutes);
router.use("/airports", airportRoutes);
router.use("/cities", cityRoutes);

// router.get("/ping", PingController.ping);

module.exports = router;
