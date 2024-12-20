const { StatusCodes } = require("http-status-codes");
const ping = (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Hello, world!",
    error: {},
  });
};

module.exports = {
  ping,
};
