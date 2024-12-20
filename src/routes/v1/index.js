const express = require("express");
// const { PingController } = require("../../controllers");
const airplaneRoutes = require("./airplane-routes");
const cityRoutes = require("./city-routes");
const router = express.Router();
// router.get("/ping", (req, res) => {
//   return res.json({ msg: "ok" });
// });
router.use("/airplanes", airplaneRoutes);
router.use("/cities", cityRoutes);
// router.get("/ping", PingController.ping);

module.exports = router;
