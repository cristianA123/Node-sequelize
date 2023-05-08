const { response, request } = require( 'express' );
const { QueryTypes } = require('sequelize');

const Flight = require('../models/flight');
const db = require('../database/connection');


const getFlightByIdWithPassenger= async (req = request, res= response) => {

    try {
        
        const { id } = req.params;

        if ( Number.isInteger(id) ){
          return res.status(404).json({
            code: 404,
            data: {},
          });
        }
    
        let flight = await Flight.findByPk(id);

        if( !flight ){
          return res.status(404).json({
            code: 404,
            data: {},
          });
        }
          
        const passengers = await db.query(`
        SELECT passenger.*, boarding_pass.* 
        FROM boarding_pass
        INNER JOIN passenger  ON passenger.passenger_id = boarding_pass.passenger_id
        WHERE boarding_pass.flight_id = `+ id + `
        ORDER BY boarding_pass.passenger_id DESC
        `, { type: QueryTypes.SELECT });
        
        
        const data = {
            ...flight.toJSON(),
            passengers: passengers
        }
        const parseData = JSON.stringify(data)
        const newData = convertKeysToCamelCase(JSON.parse(parseData));
          
        return res.status(200).json({
            code: 200,
            data: newData,
          });

    } catch (error) {
        return res.status(400).json({
            code: 400,
            errors: "could not connect to db",
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