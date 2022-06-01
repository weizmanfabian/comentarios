import mysql from 'mysql'
import { configDatabase } from '../config.js'


const conexion = mysql.createConnection(configDatabase)

conexion.connect((err) => {
    if (err) throw err;
    console.log('Conexión exitosa');
})

export default conexion