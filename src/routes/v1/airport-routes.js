const express = require("express");
const { AirportController } = require("../../controllers");
const { AirportMiddleware } = require("../../middlewares");
// const { AirplaneMiddleware } = require("../../middlewares");

const router = express.Router();

router.post(
  "/",
  AirportMiddleware.validateCreateRequest,
  AirportController.createAirport
);
router.get("/", AirportController.getAirports);
router.get("/:id", AirportController.getAirport);
router.delete("/:id", AirportController.destroyAirport);
router.patch("/:id", AirportController.updateAirport);
module.exports = router;
