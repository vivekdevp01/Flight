const { CityService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { StatusCodes } = require("http-status-codes");
async function createCity(req, res) {
  try {
    const response = await CityService.createCity({
      name: req.body.name,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
async function destroyCity(req, res) {
  try {
    const response = await CityService.destroyCity(req.params.id);
    SuccessResponse.data = response;
    SuccessResponse.message = "Successfully destroyed";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
async function updateCity(req, res) {
  try {
    const response = await CityService.updateCity(req.params.id, req.body);
    SuccessResponse.data = response;
    SuccessResponse.message = "Successfully updated City";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while updating City";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createCity,
  destroyCity,
  updateCity,
};
