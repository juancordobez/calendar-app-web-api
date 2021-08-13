/* 
    Rutas de Events / events
    host + api/events 
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');

const { getEvento, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = Router(); 

router.use( validarJWT );

// Obtener evento
router.get( '/', getEvento );

// Crear un nuevo evento 
router.post(
    '/',
    [
        check( 'title', 'El titulo es obigatorio').not().isEmpty(),
        check( 'start', 'La fecha de inicio es obigatoria').custom( isDate ),
        check( 'end', 'La fecha final es obigatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento
);

// Actualizar evento
router.put(
    '/:id',
    [
        check( 'title', 'El titulo es obigatorio').not().isEmpty(),
        check( 'start', 'La fecha de inicio es obigatoria').custom( isDate ),
        check( 'end', 'La fecha final es obigatoria').custom( isDate ),
        validarCampos
    ],
    actualizarEvento
);

//Borrar evento
router.delete( '/:id', eliminarEvento );

module.exports = router;


