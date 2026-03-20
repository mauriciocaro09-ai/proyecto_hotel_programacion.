/**
 * Servidor principal de la aplicación HOSPEDAJE_DIGITAL
 * API REST con Express
 */

const app = require('./src/app');
const port = process.env.PORT || 3000;

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
