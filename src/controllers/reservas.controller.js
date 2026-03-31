/**
 * Controlador de Reservas
 */

const reservaModel = require('../models/reserva');

// Listar todas las reservas
const list = async (req, res) => {
    try {
        const reservas = await reservaModel.list();
        res.json(reservas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las reservas" });
    }
};

// Obtener reserva por ID
const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const reserva = await reservaModel.getById(id);
        if (!reserva) {
            return res.status(404).json({ error: "Reserva no encontrada" });
        }
        res.json(reserva);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la reserva" });
    }
};

// Crear reserva
const create = async (req, res) => {
    try {
        console.log('Datos de reserva recibidos:', req.body);
        const nuevaReserva = await reservaModel.create(req.body);
        res.status(201).json({ 
            message: "Reserva creada exitosamente",
            IDReserva: nuevaReserva.insertId
        });
    } catch (error) {
        console.error("Error al crear reserva:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Actualizar reserva
const update = async (req, res) => {
    const { id } = req.params;
    try {
        await reservaModel.update(id, req.body);
        res.json({ message: "Reserva actualizada exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la reserva" });
    }
};

// Eliminar reserva
const remove = async (req, res) => {
    const { id } = req.params;
    console.log('Controlador: Eliminando reserva con ID:', id);
    try {
        const result = await reservaModel.delete(id);
        console.log('Controlador: Reserva eliminada exitosamente:', result);
        res.json({ message: "Reserva eliminada exitosamente" });
    } catch (error) {
        console.error("Controlador: Error al eliminar reserva:", error);
        res.status(500).json({ error: "Error al eliminar la reserva" });
    }
};

module.exports = {
    list,
    getById,
    create,
    update,
    remove
};
