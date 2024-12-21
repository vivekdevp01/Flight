const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const flightRepository = new FlightRepository();
const { StatusCodes } = require("http-status-codes");
const { compareTime } = require("../utils/helpers/dateTime-helper");
async function createFlight(data) {
  try {
    const { arrivalTime, departureTime } = data;
    console.log(data);
    if (!compareTime(arrivalTime, departureTime)) {
      throw new AppError(
        "Arrival time cannot be less than departure time",
        StatusCodes.BAD_REQUEST
      );
    }
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    if (error.statusCode == StatusCodes.BAD_REQUEST) {
      throw new AppError(
        "Arrival time cannot be less than departure time",
        StatusCodes.BAD_REQUEST
      );
    }
    throw new AppError(
      "Cannot create a new flight object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
module.exports = {
  createFlight,
};
