const { Router } = require( 'express' );


const { getFlightByIdWithPassenger } = require('../controllers/flight');


const router = Router();

router.get('/:id/passengers', getFlightByIdWithPassenger )


module.exports = router;