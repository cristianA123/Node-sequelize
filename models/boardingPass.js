const { DataTypes } = require('sequelize');
const db = require('../database/connection');
const Seat = require("./flight");
const Flight = require("./flight");
const SeatType = require("./seatType");
const Passenger = require("./passenger");
const Purchase = require("./purchase");

const BoardingPass = db.define('boarding_pass', {
    boarding_pass_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    purchase_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Purchase,
          key: 'purchase_id',
        },
    },
    passenger_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Passenger,
          key: 'passenger_id',
        },
    },
    seat_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Seat,
          key: 'seat_id',
        },
    },
    seat_type_id: {
        type: DataTypes.INTEGER,
        references: {
          model: SeatType,
          key: 'seat_type_id',
        },
    },
    flight_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Flight,
          key: 'flight_id',
        },
    },
   
}, {
    freezeTableName: true,
    timestamps: false
  })

  BoardingPass.belongsTo(Purchase, { foreignKey: 'seat_type_id' });
  BoardingPass.belongsTo(Passenger, { foreignKey: 'passenger_id' });
  BoardingPass.belongsTo(Seat, { foreignKey: 'seat_id' });
  BoardingPass.belongsTo(SeatType, { foreignKey: 'seat_type_id' });
  BoardingPass.belongsTo(Flight, { foreignKey: 'flight_id' });

module.exports = BoardingPass