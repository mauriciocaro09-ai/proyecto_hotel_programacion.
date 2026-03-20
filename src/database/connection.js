const mysql = require('mysql2'); // importamos el modulo mysql2

// creamos la conexion a la base de datos
const connection = mysql.createConnection({
    host: 'localhost', // el host de la base de datos
    user: 'root', // el usuario de la base de datos
    password: '', // la contraseña de la base de datos
    database: 'hospedaje'// el nombre de la base de datos
});

// exportamos la conexion a la base de datos
module.exports = connection.promise(); 