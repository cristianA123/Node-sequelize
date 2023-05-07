
const { Sequelize } = require('sequelize');
const { QueryTypes } = require('sequelize');


const db = new Sequelize('airline', 'bsale_test', 'bsale_test',{
    host: 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
    dialect: 'mysql',
})

async function prueba() {
    const suma = await db.query('SELECT 1+2 AS result LIMIT 1', {
      type: QueryTypes.SELECT,
    });
    console.log(suma);
}
prueba()



module.exports = db