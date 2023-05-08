const express = require('express')
var cors = require('cors');
const fileUpload = require('express-fileupload');
const db = require('../database/connection.js');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {

            flight: '/flights'

        }
        this.conectarBD();
        
        this.middlewares();

        this.route();
    }

    async conectarBD(){
        try {
            await db.authenticate();
            console.log('DB online');
            
        } catch (error) {
            console.log(error.message);
            return {
                code: 400,
                errors: "could not connect to db"
            }
        }

    }

    middlewares(){

        this.app.use( cors() )

        this.app.use(  express.json() );

        this.app.use( express.static('public') );

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    route(){

        this.app.use( this.paths.flight, require('../routes/flight.js') );

    }

    listen(){
        this.app.listen( this.port , ()=>{
            console.log("Corriendo en el puerto", this.port )
        })
    }


}



module.exports = Server;