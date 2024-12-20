const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const cityRepository = new CityRepository();

async function createCity(data) {
  try {
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    console.log(error);
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function destroyCity(id) {
  try {
    const city = await cityRepository.destroy(id);
    return city;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError("City not found", StatusCodes.NOT_FOUND);
    }
    throw new AppError("Cannot delete City", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
async function updateCity(id, data) {
  try {
    const city = await cityRepository.update(id, data);
    return city;
  } catch (error) {
    console.log(error);
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError("city with id given not found", StatusCodes.NOT_FOUND);
    }
    throw new AppError(
      "Cannot update a city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
module.exports = {
  createCity,
  destroyCity,
  updateCity,
};
