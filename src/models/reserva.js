/**
 * Modelo de Reservas
 */

const db = require('../database/connection');

// Listar todas las reservas
const list = async () => {
    const [reservas] = await db.query(`
        SELECT r.*, h.NombreHabitacion 
        FROM reserva r 
        LEFT JOIN habitacion h ON r.IDHabitacion = h.IDHabitacion
    `);
    return reservas;
};

// Obtener reserva por ID
const getById = async (id) => {
    const [rows] = await db.query(`
        SELECT r.*, h.NombreHabitacion 
        FROM reserva r 
        LEFT JOIN habitacion h ON r.IDHabitacion = h.IDHabitacion
        WHERE r.IDReserva = ?
    `, [id]);
    return rows[0];
};

// Crear reserva
const create = async (reservaData) => {
    const { 
        IDHabitacion,
        NombreCliente, 
        EmailCliente, 
        TelefonoCliente, 
        FechaEntrada, 
        FechaSalida, 
        NumeroAdultos, 
        NumeroNinos, 
        CostoTotal, 
        Estado 
    } = reservaData;

    // Usar la estructura existente de la tabla reserva
    const [result] = await db.query(
        `INSERT INTO reserva (IdReserva, NroDocumentoCliente, FechaReserva, FechaInicio, FechaFinalizacion, SubTotal, Descuento, IVA, MontoTotal, MetodoPago, IdEstadoReserva) 
         VALUES (NULL, ?, NOW(), ?, ?, ?, 0, ?, ?, 1, 1)`,
        [NombreCliente, FechaEntrada, FechaSalida, CostoTotal, CostoTotal, CostoTotal]
    );
    return result;
};

// Actualizar reserva
const update = async (id, reservaData) => {
    const { 
        IDHabitacion, 
        IDCliente, 
        NombreCliente, 
        EmailCliente, 
        TelefonoCliente, 
        FechaEntrada, 
        FechaSalida, 
        NumeroAdultos, 
        NumeroNinos, 
        CostoTotal, 
        Estado 
    } = reservaData;

    await db.query(
        `UPDATE reserva SET 
            IDHabitacion = ?, IDCliente = ?, NombreCliente = ?, EmailCliente = ?, 
            TelefonoCliente = ?, FechaEntrada = ?, FechaSalida = ?, 
            NumeroAdultos = ?, NumeroNinos = ?, CostoTotal = ?, Estado = ?
         WHERE IDReserva = ?`,
        [IDHabitacion, IDCliente, NombreCliente, EmailCliente, TelefonoCliente, 
         FechaEntrada, FechaSalida, NumeroAdultos, NumeroNinos, CostoTotal, Estado, id]
    );
};

// Eliminar reserva
const remove = async (id) => {
    await db.query('DELETE FROM reserva WHERE IDReserva = ?', [id]);
};

module.exports = {
    list,
    getById,
    create,
    update,
    remove
};
