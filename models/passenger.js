const { DataTypes } = require('sequelize');
const db = require('../database/connection');

const Passenger = db.define('passenger', {
    passenger_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dni: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    },
    country: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true,
    timestamps: false
  })

module.exports = Passenger
