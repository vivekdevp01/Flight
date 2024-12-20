const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const airplaneRepository = new AirplaneRepository();
const { StatusCodes } = require("http-status-codes");
async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new airplane object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAirplanes() {
  try {
    const airplanes = await airplaneRepository.getAll();
    return airplanes;
  } catch (error) {
    throw new AppError(
      "Cannot fetch Airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAirplane(id) {
  try {
    const airplane = await airplaneRepository.get(id);
    return airplane;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError("Airplane not found", StatusCodes.NOT_FOUND);
    }
    throw new AppError(
      "Cannot fetch Airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function destroyAirplane(id) {
  try {
    const airplane = await airplaneRepository.destroy(id);
    return airplane;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError("Airplane not found", StatusCodes.NOT_FOUND);
    }
    throw new AppError(
      "Cannot delete Airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function updateAirplane(id, data) {
  try {
    if (data.capacity && data.capacity > 1000) {
      throw new AppError(
        "Capacity cannot exceed 1000",
        StatusCodes.BAD_REQUEST
      );
    }
    const airplane = await airplaneRepository.update(id, data);
    return airplane;
  } catch (error) {
    console.log(error);
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "Airplane with id given not found",
        StatusCodes.NOT_FOUND
      );
    }
    if (error.statusCode == StatusCodes.BAD_REQUEST) {
      throw new AppError(
        "Capacity cannot exceed 1000",
        StatusCodes.BAD_REQUEST
      );
    }
    throw new AppError(
      "Cannot update a new airplane object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  destroyAirplane,
  updateAirplane,
};
