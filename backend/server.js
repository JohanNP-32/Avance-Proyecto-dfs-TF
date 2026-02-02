const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

// Ruta para obtener productos (Pública para mostrar en el frontend)
app.get('/api/productos', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM productos');
        res.json(rows);
    } catch (error) {
        next(error);
    }
});

// Middleware de Manejo de Errores (IA Generated & Adapted)
app.use((err, req, res, next) => {
    console.error(`[Error]: ${err.stack}`);
    res.status(500).json({
        estado: 'error',
        mensaje: 'Ocurrió un error interno en el servidor.',
        detalle: process.env.NODE_ENV === 'development' ? err.message : null
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor Luxury corriendo en puerto ${PORT}`));