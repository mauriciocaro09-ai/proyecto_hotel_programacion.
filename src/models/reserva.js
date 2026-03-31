/**
 * Modelo de Reservas
 */

const db = require('../database/connection');

// Listar todas las reservas
const list = async () => {
    const [reservas] = await db.execute(`
        SELECT r.*, c.Nombre, c.Apellido, c.Email
        FROM reserva r
        LEFT JOIN cliente c ON r.NroDocumentoCliente = c.NroDocumento
        ORDER BY r.FechaReserva DESC
    `);
    return reservas;
};

// Obtener reserva por ID
const getById = async (id) => {
    const [rows] = await db.execute(`
        SELECT r.*, c.Nombre, c.Apellido, c.Email, c.Telefono
        FROM reserva r
        LEFT JOIN cliente c ON r.NroDocumentoCliente = c.NroDocumento
        WHERE r.IdReserva = ?
    `, [id]);
    return rows[0];
};

// Crear reserva
const create = async (reservaData) => {
    const {
        NroDocumentoCliente,
        FechaInicio,
        FechaFinalizacion,
        Sub_Total,
        Descuento,
        IVA,
        Monto_Total,
        MetodoPago,
        IdEstadoReserva,
        id_usuario
    } = reservaData;

    const [result] = await db.execute(
        `INSERT INTO reserva (NroDocumentoCliente, FechaReserva, FechaInicio, FechaFinalizacion, Sub_Total, Descuento, IVA, Monto_Total, MetodoPago, IdEstadoReserva, id_usuario)
         VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [NroDocumentoCliente, FechaInicio, FechaFinalizacion, Sub_Total, Descuento, IVA, Monto_Total, MetodoPago, IdEstadoReserva, id_usuario]
    );
    return result;
};

// Actualizar reserva
const updateReserva = async (id, reservaData) => {
    const {
        NroDocumentoCliente,
        FechaInicio,
        FechaFinalizacion,
        Sub_Total,
        Descuento,
        IVA,
        Monto_Total,
        MetodoPago,
        IdEstadoReserva,
        id_usuario
    } = reservaData;

    const [result] = await db.execute(
        `UPDATE reserva SET NroDocumentoCliente = ?, FechaInicio = ?, FechaFinalizacion = ?, Sub_Total = ?, Descuento = ?, IVA = ?, Monto_Total = ?, MetodoPago = ?, IdEstadoReserva = ?, id_usuario = ? WHERE IdReserva = ?`,
        [NroDocumentoCliente, FechaInicio, FechaFinalizacion, Sub_Total, Descuento, IVA, Monto_Total, MetodoPago, IdEstadoReserva, id_usuario, id]
    );
    return result;
};

// Eliminar reserva
const deleteReserva = async (id) => {
    console.log('Intentando eliminar reserva con ID:', id);
    try {
        const [result] = await db.execute("DELETE FROM reserva WHERE IdReserva = ?", [id]);
        console.log('Resultado de eliminación:', result);
        console.log('Filas afectadas:', result.affectedRows);
        return result;
    } catch (error) {
        console.error('Error en deleteReserva:', error);
        throw error;
    }
};

// Obtener reservas por cliente
const getByCliente = async (nroDocumento) => {
    const [reservas] = await db.execute(`
        SELECT r.*, c.Nombre, c.Apellido
        FROM reserva r
        LEFT JOIN cliente c ON r.NroDocumentoCliente = c.NroDocumento
        WHERE r.NroDocumentoCliente = ?
        ORDER BY r.FechaReserva DESC
    `, [nroDocumento]);
    return reservas;
};

module.exports = {
    list,
    getById,
    create,
    update: updateReserva,
    delete: deleteReserva,
    getByCliente
};
