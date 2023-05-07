const { response, request } = require( 'express' );
const { Sequelize, Op, QueryTypes } = require('sequelize');

const Passenger = require('../models/passenger');
const Airplane = require('../models/airplane');
const BoardingPass = require('../models/boardingPass');
const Flight = require('../models/flight');
const Purchase = require('../models/purchase');
const Seat = require('../models/seat');
const SeatType = require('../models/seatType');
const db = require('../database/connection');
// OBTENER CATEGORIAS
const getFlightByIdWithPassenger= async (req = request, res= response) => {

    try {
        
        const { id } = req.params;
    
        let flight = await Flight.findByPk(id);
          
        const passengers = await db.query(`
        SELECT passenger.*, boarding_pass.boarding_pass_id , boarding_pass.purchase_id ,boarding_pass.seat_id ,boarding_pass.seat_type_id , boarding_pass.flight_id 
        FROM boarding_pass
        INNER JOIN passenger  ON passenger.passenger_id = boarding_pass.passenger_id
        WHERE boarding_pass.flight_id = `+ id + `
        ORDER BY boarding_pass.passenger_id DESC
        LIMIT 2
        `);
        
        
        const data = {
            ...flight.toJSON(),
            passengers: passengers[0]
        }
        const pas2 = JSON.stringify(data)
        const data2 = convertKeysToCamelCase(JSON.parse(pas2));
          
        return res.json({
            code: 200,
            data: data2,
          });
    } catch (error) {
        return res.json({
            code: 404,
            data: {},
          });
    }


};

convertKeysToCamelCase = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(v => convertKeysToCamelCase(v));
    } else if (obj !== null && typeof obj === 'object') {
      return Object.keys(obj).reduce((result, key) => {
        const camelCaseKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        result[camelCaseKey] = convertKeysToCamelCase(obj[key]);
        return result;
      }, {});
    }
    return obj;
  }

module.exports = {
    getFlightByIdWithPassenger,
}