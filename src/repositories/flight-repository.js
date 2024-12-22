const { Sequelize } = require("sequelize");
const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport, City } = require("../models");

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }
  async getAllFlights(filter, sort) {
    const response = await Flight.findAll({
      where: filter,
      order: sort,
      include: [
        {
          model: Airplane,
          //  , for innerjoin
          required: true,
          as: "airplane_details",
        },
        {
          model: Airport,
          required: true,
          as: "departure_airport_details",
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.departureAirportId"),
              "=",
              Sequelize.col("departure_airport_details.code")
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
        {
          model: Airport,
          required: true,
          as: "arrival_airport_details",
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.arrivalAirportId"),
              "=",
              Sequelize.col("arrival_airport_details.code")
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
      ],
    });
    return response;
  }
}

module.exports = FlightRepository;
