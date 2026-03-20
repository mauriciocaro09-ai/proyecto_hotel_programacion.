/**
 * Rutas para el módulo de Reservas
 */

const express = require('express');
const router = express.Router();

// Importar controlador de reservas
const reservasController = require('../controllers/reservas.controller');

// Rutas CRUD para reservas
// GET /api/reservas - Listar todas las reservas
router.get('/', reservasController.list);

// GET /api/reservas/:id - Obtener una reserva por ID
router.get('/:id', reservasController.getById);

// POST /api/reservas - Crear una nueva reserva
router.post('/', reservasController.create);

// PUT /api/reservas/:id - Actualizar una reserva
router.put('/:id', reservasController.update);

// DELETE /api/reservas/:id - Eliminar una reserva
router.delete('/:id', reservasController.remove);

module.exports = router;
