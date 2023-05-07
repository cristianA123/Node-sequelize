const { DataTypes } = require('sequelize');
const db = require('../database/connection');

const Airplane = db.define('airplane', {
    airplane_id: {
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

module.exports = Airplane