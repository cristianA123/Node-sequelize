const { DataTypes } = require('sequelize');
const db = require('../database/connection');
const Airplane = require("./airplane");
// const BoardingPass = require("./boardingPass");
const BoardingPass = db.define('boarding_pass');


const Flight = db.define('flight', {
    flight_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    takeoff_date_time: {
        type: DataTypes.INTEGER
    },
    takeoff_airport: {
        type: DataTypes.STRING
    },
    landing_date_time: {
        type: DataTypes.INTEGER
    },
    landing_airport: {
        type: DataTypes.STRING
    },
    airplane_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Airplane,
          key: 'airplane_id',
        },
    }
}, 
{
    freezeTableName: true,
    timestamps: false
})
Flight.belongsTo(Airplane, { foreignKey: 'airplane_id' });
Flight.hasMany(BoardingPass, { foreignKey: 'flight_id' });

module.exports = Flight