const { DataTypes } = require("sequelize");
const db = require("../database/connection");
const SeatType = require("./seatType");
const Airplane = require("./airplane");

const Seat = db.define(
  "seat",
  {
    seat_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    seat_column: {
      type: DataTypes.STRING,
    },
    seat_row: {
      type: DataTypes.INTEGER,
    },
    seat_type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: SeatType,
        key: "seat_type_id",
      },
    },
    airplane_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Airplane,
        key: "airplane_id",
      },
    },
  },

  {
    freezeTableName: true,
    timestamps: false,
  }
);

Seat.belongsTo(SeatType, { foreignKey: "seat_type_id" });
Seat.belongsTo(Airplane, { foreignKey: "seat_type_id" });

module.exports = Seat;
