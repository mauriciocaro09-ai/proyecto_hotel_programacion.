const habitaciones = require('../controllers/habitaciones.controller');
// Función para listar todas las habitaciones
const listHabitaciones = async () => {
    return await habitaciones.getAll();
};

// Función para obtener una habitación por ID
const getHabitacionById = async (id) => {
    return await habitaciones.getById(id);
};

// Función para crear una nueva habitación
const createHabitacion = async (data) => {
    return await habitaciones.create(data);
};

// Función para actualizar una habitación
const updateHabitacion = async (id, data) => {
    return await habitaciones.update(id, data);
};

// Función para eliminar una habitación
const removeHabitacion = async (id) => {
    return await habitaciones.remove(id);
};  

module.exports = {
    listHabitaciones,
    getHabitacionById,
    createHabitacion,
    updateHabitacion,
    removeHabitacion
};                          



