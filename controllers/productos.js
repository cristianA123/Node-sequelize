const { response, request } = require( 'express' );
const bcryptjs = require('bcryptjs');
const { Categoria, Producto } =  require('../models');
const Passenger = require('../models/passenger');
const Airplane = require('../models/airplane');
const BoardingPass = require('../models/boardingPass');
const Flight = require('../models/flight');
const Purchase = require('../models/purchase');
const Seat = require('../models/seat');
const SeatType = require('../models/seatType');
const db = require('../database/connection');
const { QueryTypes } = require('sequelize');
const { Sequelize } = require('sequelize');


// OBTENER CATEGORIAS
const obtnerProductos = async (req = request, res= response) => {

    // const pas = await Passenger.findAll({
    //     attributes: ['name','passenger_id','dni','age','country']
    //   });

    // const pas = await Airplane.findAll();
    // const pas = await BoardingPass.findAll();
    // const pas = await Flight.findAll();
    // const pas = await Passenger.findAll();
    // const pas = await Purchase.findAll();
    // const pas = await Seat.findAll();
    // const pas = await SeatType.findAll()
        const pas = await Seat.findAll({
        //attributes: ['seat_type_id']
        include: [
            { model: SeatType }
          ],
        
    });

    res.json({
      a: 'asa',
      pas
    });
};

const obtnerProducto = async (req = request, res= response) => {

    // const pas = await Airplane.findAll();
    // const pas = await BoardingPass.findAll();
    // const pas = await Flight.findAll();
    // const pas = await Passenger.findAll();
    // const pas = await Purchase.findAll();
    const pas = await Seat.findAll();
    // const pas = await SeatType.findAll()

    res.json({
        pas
    });



};

const obtenerProductoporId = async (req = request, res= response) => {

    // const pas = await Airplane.findAll();
    // const pas = await BoardingPass.findAll();
    // const pas = await Flight.findAll();
    // const pas = await Passenger.findAll();
    // const pas = await Purchase.findAll();
    const { id } = req.params;

    // const pas = await Flight.findAll({
    //     where: { 
    //         flight_id: id 
    //     },
    //     include: [
    //         { 
    //             model: BoardingPass,
    //             attributes: [
    //                 'boarding_pass_id',
    //                 'purchase_id',
    //                 'passenger_id',
    //                 'seat_id',
    //                 'seat_type_id',
    //                 'flight_id'
    //             ],
    //             include: [
    //                 {model: Passenger,
    //                  attributes: [
    //                      'passenger_id',
    //                      'dni',
    //                      'name',
    //                      'age',
    //                      'country'
    //                  ]}
    //             ]
    //         }
    //     ],
    // });
    // const pas = await SeatType.findAll()
    let arreglo1 = await Flight.findByPk(id);
      
    const suma = await db.query(`
    SELECT 1+1
    `);

    // const users = await sequelize.query("SELECT * FROM passenger", { type: QueryTypes.SELECT });

    console.log(suma)

    //   json = JSON(arreglo1)

    //   arreglo1.push(arreglo2)  
    // data = {
    //     ...arreglo1.toJSON(),
    //     passengers: arreglo2
    // }
      
      res.json({
        // arreglo2,
        users,
        code: 200,
        suma
      });



};
// CREAR Producto ******************************************************
const crearProducto = async (req, res =response) => {

    const {estado, usuario,  ...body } = req.body;
    const nombre = req.body.nombre.toUpperCase();

    const productoBD = await Producto.findOne( { nombre } );

    if( productoBD ){
        return res.status( 400 ).json({
            msg:" Ya existe producto - !productoBD "
        })
    }
    const validarestadocategoria = await Categoria.findById( body.categoria );

    if(!validarestadocategoria.estado){
        return res.status( 400 ).json({
            msg:"Verifique el estado de la categoria"
        })
    }

    const data = {
        nombre,
        ...body,
        usuario: req.usuario._id,
    }

    const producto = new Producto( data );
    producto.save();
    
    res.status( 201 ).json( producto );
    

}

// Actualizar Categoria
const actualizarProducto = async (req = request, res =response ) => {

    const id = req.params.id;
    const {precio, 
        descripcion, 
        disponible ,
        categoria, 
        img,
        idProducto,
        mac,
        activo
    } = req.body;

    const nombre = req.body.nombre.toUpperCase();

    const nombrebica = await Producto.findOne( { 
        nombre, 
        estado:true
    } )

    const validarestadocategoria = await Categoria.findById(categoria);
    if(!validarestadocategoria.estado){
        return res.status( 400 ).json({
            msg:"Verifique el estado de la categoria"
        })
    }

    // if( nombrebica ){89
    //     return res.status( 404).json({
    //         msg:"El producto ya existe - romel mmgvzo!!"
    //     });
    // }

    const productoID = await Producto.findById(id)

    if(productoID.nombre!==nombre){
        const productoDB = await Producto.findOne({ nombre });

      //  Si el producto existe
        if (productoDB) {
          return res.status(400).json({
            msg:`  La Producto ${productoDB.nombre}, ya existe, Romel mmgvzo!!`,
          });
        }
      }

    const productomodificado = await Producto.findByIdAndUpdate(
        id, 
        {
            nombre,
            precio,
            descripcion,
            disponible,
            img,
            idProducto,
            mac,
            activo
        },
        { new: true })

    console.log(productomodificado);

    res.json({
        productomodificado
    });
}

// Borrar Categoria
const borrarProducto = async (req, res) => {

    const { id } = req.params;
    
    const producto = await Producto.findByIdAndUpdate( id, { estado :false } , { new : true } )

    res.json({
        'ok':true,
        msg: 'DELETE API',
        id,
        producto,
        // categoriaAnterior
    })
}

module.exports = {
    obtnerProductos,
    obtnerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto,
    obtenerProductoporId
}