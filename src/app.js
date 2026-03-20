/**
 * Archivo principal de configuración de Express
 * Maneja middlewares y rutas
 */

const express = require('express');
const cors = require('cors');
const app = express();

// Configuración de CORS para permitir peticiones desde el frontend
// Esto permite que tu frontend (en otra carpeta/servidor) pueda consumir la API
app.use(cors({
    origin: '*', // Permite peticiones desde cualquier origen (para desarrollo)
    // Para producción, cambia '*' por la URL específica de tu frontend:
    // origin: 'http://localhost:5173' // Ejemplo para Vite
    // origin: 'http://localhost:3001' // Ejemplo para otro puerto
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para parsear JSON
app.use(express.json());

// Middleware para parsear URL-encoded
app.use(express.urlencoded({ extended: true }));

// Importar rutas
const habitacionesRoutes = require('./routes/habitaciones.routes');
const serviciosRoutes = require('./routes/servicios.routes');
const clienteRoutes = require('./routes/ClienteRoutes');
const reservasRoutes = require('./routes/reservas.routes');

// Rutas de la API
app.use('/api/habitaciones', habitacionesRoutes);
app.use('/api/servicios', serviciosRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/reservas', reservasRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({
        message: 'API de HOSPEDAJE_DIGITAL funcionando',
        endpoints: {
            habitaciones: '/api/habitaciones',
            servicios: '/api/servicios',
            clientes: '/api/clientes'
        }
    });
});

module.exports = app;
