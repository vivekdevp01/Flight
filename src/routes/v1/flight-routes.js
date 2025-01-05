const express = require("express");
const { FlightController } = require("../../controllers");
// const { AirportMiddleware } = require("../../middlewares");
// const { AirplaneMiddleware } = require("../../middlewares");
const { FlightMiddleware } = require("../../middlewares");
const router = express.Router();

router.post(
  "/",
  FlightMiddleware.validateCreateRequest,
  FlightController.createFlight
);
router.get("/", FlightController.getAllFlights);
router.get("/:id", FlightController.getFlight);
router.patch(
  "/:id/seats",
  FlightMiddleware.validateUpdateSeats,
  FlightController.updateSeats
);
module.exports = router;
