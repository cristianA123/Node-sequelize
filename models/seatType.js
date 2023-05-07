const { DataTypes } = require('sequelize');
const db = require('../database/connection');

const SeatType = db.define('seat_type', {
    seat_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true,
    timestamps: false
  })

module.exports = SeatType