const express = require("express");
const { CityController } = require("../../controllers");
const { CityMiddleware } = require("../../middlewares");
// const { AirplaneMiddleware } = require("../../middlewares");

const router = express.Router();

// router.post(
//   "/",
//   AirplaneMiddleware.validateCreateRequest,
//   AirplaneController.createAirplane
// );
// router.get("/", AirplaneController.getAirplanes);
// router.get("/:id", AirplaneController.getAirplane);
// router.delete("/:id", AirplaneController.destroyAirplane);
// router.patch("/:id", AirplaneController.updateAirplane);
router.post(
  "/",
  CityMiddleware.validateCreateRequest,
  CityController.createCity
);
router.delete("/:id", CityController.destroyCity);
router.patch("/:id", CityController.updateCity);
module.exports = router;
