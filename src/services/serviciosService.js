const serviciosController = require('../controllers/servicios.controller');

// Función para listar todos los servicios
const listServicios = async () => {
    return await serviciosController.list();
};

// Función para obtener un servicio por ID
const getServicioById = async (id) => {
    return await serviciosController.getById(id);
};

// Función para crear un nuevo servicio
const createServicio = async (data) => {
    return await serviciosController.create(data);
};

// Función para actualizar un servicio
const updateServicio = async (id, data) => {
    return await serviciosController.update(id, data);
};

// Función para eliminar un servicio
const removeServicio = async (id) => {
    return await serviciosController.remove(id);
};

module.exports = {
    listServicios,
    getServicioById,
    createServicio,
    updateServicio,
    removeServicio
};
