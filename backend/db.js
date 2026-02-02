const mysql = require('mysql2');
const path = require('path');

// 1. Forzamos la carga del archivo .env usando la ruta exacta de este archivo
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// 2. IMPRESIÓN DE DEPURACIÓN (Revisa tu terminal al guardar)
console.log("--- DEBUG CONEXIÓN ---");
console.log("Usuario leído:", process.env.DB_USER);
console.log("Base de datos:", process.env.DB_NAME);
console.log("----------------------");

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER, // Si esto sigue fallando, escribe aquí 'root' directamente para probar
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();