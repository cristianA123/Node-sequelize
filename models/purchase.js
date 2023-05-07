const { DataTypes } = require('sequelize');
const db = require('../database/connection');

const Purchase = db.define('purchase', {
    purchase_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    purchase_date: {
        type: DataTypes.INTEGER
    },
}, {
    freezeTableName: true,
    timestamps: false
  })

module.exports = Purchase