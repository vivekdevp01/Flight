const { AirportRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const airportRepository = new AirportRepository();
const { StatusCodes } = require("http-status-codes");
async function createAirport(data) {
  try {
    const airport = await airportRepository.create(data);
    console.log(airport);
    return airport;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new airport object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAirports() {
  try {
    const airports = await airportRepository.getAll();
    return airports;
  } catch (error) {
    throw new AppError(
      "Cannot fetch Airports",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAirport(id) {
  try {
    const airport = await airportRepository.get(id);
    return airport;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError("Airport not found", StatusCodes.NOT_FOUND);
    }
    throw new AppError(
      "Cannot fetch Airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function destroyAirport(id) {
  try {
    const airport = await airportRepository.destroy(id);
    return airport;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError("Airport not found", StatusCodes.NOT_FOUND);
    }
    throw new AppError(
      "Cannot delete Airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function updateAirport(id, data) {
  try {
    const airport = await airportRepository.update(id, data);
    return airport;
  } catch (error) {
    console.log(error);
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "Airport with id given not found",
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      "Cannot update a new airplane object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
module.exports = {
  createAirport,
  getAirports,
  getAirport,
  destroyAirport,
  updateAirport,
};
