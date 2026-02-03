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

// --- RUTAS ---
app.use('/api/auth', authRoutes);

// Ruta para obtener productos
app.get('/api/productos', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM productos');
        res.json(rows);
    } catch (error) {
        next(error);
    }
});


app.post('/api/compra', async (req, res, next) => {
    try {
        const carrito = req.body; 

        // Usamos un bucle para procesar cada item de forma asíncrona
        for (const item of carrito) {
            const columnaStock = item.selectedSize === '50ml' ? 'stock_50' : 'stock_100';
            
            
            const sql = `UPDATE productos SET ${columnaStock} = ${columnaStock} - ? WHERE id = ?`;
            
            await db.query(sql, [item.quantity, item.id]);
        }

        res.json({ mensaje: "Compra procesada y stock actualizado correctamente" });

    } catch (error) {
        // Si falla algo, pasamos el error al manejador central
        next(error);
    }
});

// --- MANEJO DE ERRORES ---
app.use((err, req, res, next) => {
    console.error(`[Error]: ${err.stack}`);
    res.status(500).json({
        estado: 'error',
        mensaje: 'Ocurrió un error interno en el servidor.',
        detalle: process.env.NODE_ENV === 'development' ? err.message : null
    });
});

// --- SERVIDOR ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Base de datos corriendo en puerto ${PORT}`));