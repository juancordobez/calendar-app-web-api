const express = require('express');
require( 'dotenv' ).config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// console.log(process.env);

// 1 cleear el servidor de express
const app =express();

// DB 
dbConnection();

//CORS
app.use( cors() );

// 4 Directorio publico
app.use( express.static( 'public' ) );

// Lectura y parseo del body
app.use( express.json() );

// // 3 Rutas
app.use( '/api/auth', require( './routes/auth' ) );
app.use( '/api/events', require( './routes/events' ) );



// 2 Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
})

