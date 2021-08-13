/* 
    Rutas de Usuarios / Auth
    host + /api/auth
*/

                                            //  O tambien se puede hacer de la sigiente manara 
const { Router } = require( 'express' );    // const express = require( 'express' );
const { check } = require( 'express-validator' );
const router = Router();                    // const router = express.Router;

const { crearUsuario, loadinUsuario, revalidarToken } = require( '../controllers/auth' );
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


router.post(
    '/new',
    [// middlewares
        check( 'name', 'El name es obligatorio' ).not().isEmpty(),
        check( 'email', 'El email es obligatorio' ).isEmail(),
        check( 'password', 'El pasword debe tener mas de 6 caracteres' ).isLength( { min: 6 } ),
        validarCampos,
    ],
    crearUsuario
    );

router.post(
    '/',
    [
        check( 'email', 'El email es obligatorio' ).isEmail(),
        check( 'password', 'El pasword debe tener mas de 6 caracteres' ).isLength( { min: 6 } ),
        validarCampos,
    ],
    loadinUsuario
    );

router.get( '/renew', validarJWT, revalidarToken );

module.exports = router;