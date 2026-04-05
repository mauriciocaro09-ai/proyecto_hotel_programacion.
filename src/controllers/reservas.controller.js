/**
 * Controlador de Reservas
 */

const reservaModel = require('../models/reserva');

const REQUIRED_FIELDS = [
    'NroDocumentoCliente',
    'FechaInicio',
    'FechaFinalizacion',
    'Sub_Total',
    'Descuento',
    'IVA',
    'Monto_Total',
    'MetodoPago',
    'IdEstadoReserva',
    'id_usuario'
];

const parsePositiveId = (value) => {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
};

const normalizeReservationData = (data = {}) => ({
    NroDocumentoCliente: data.NroDocumentoCliente ?? data.NroDocumento ?? data.documentoCliente ?? '',
    FechaInicio: data.FechaInicio ?? data.FechaEntrada ?? '',
    FechaFinalizacion: data.FechaFinalizacion ?? data.FechaSalida ?? '',
    Sub_Total: data.Sub_Total ?? data.SubTotal ?? data.CostoTotal ?? 0,
    Descuento: data.Descuento ?? 0,
    IVA: data.IVA ?? 0,
    Monto_Total: data.Monto_Total ?? data.MontoTotal ?? data.CostoTotal ?? 0,
    MetodoPago: data.MetodoPago ?? data.IdMetodoPago ?? data.metodoPago ?? null,
    IdEstadoReserva: data.IdEstadoReserva ?? data.IdEstado ?? data.estadoId ?? 1,
    id_usuario: data.id_usuario ?? data.UsuarioIdusuario ?? data.UsuarioId ?? data.usuarioId ?? null
});

const getMissingFields = (data) => {
    return REQUIRED_FIELDS.filter((field) => data[field] === undefined || data[field] === null || data[field] === '');
};

const isValidDate = (value) => {
    const parsed = new Date(value);
    return !Number.isNaN(parsed.getTime());
};

const validateReservationPayload = (data) => {
    const missingFields = getMissingFields(data || {});

    if (missingFields.length > 0) {
        return {
            valid: false,
            message: `Faltan campos obligatorios: ${missingFields.join(', ')}`
        };
    }

    if (!isValidDate(data.FechaInicio) || !isValidDate(data.FechaFinalizacion)) {
        return {
            valid: false,
            message: 'Las fechas de inicio y finalización deben ser válidas'
        };
    }

    if (new Date(data.FechaInicio) > new Date(data.FechaFinalizacion)) {
        return {
            valid: false,
            message: 'La FechaInicio no puede ser mayor que la FechaFinalizacion'
        };
    }

    return { valid: true };
};

// Listar todas las reservas
const list = async (req, res) => {
    try {
        const reservas = await reservaModel.list();
        res.json(reservas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las reservas" });
    }
};

// Obtener reservas por documento de cliente
const getByCliente = async (req, res) => {
    const nroDocumento = req.params.nroDocumento || req.query.nroDocumento || req.query.documento;

    if (!nroDocumento) {
        return res.status(400).json({ error: 'Número de documento requerido' });
    }

    try {
        const reservas = await reservaModel.getByCliente(nroDocumento);
        res.json(reservas);
    } catch (error) {
        console.error('Error al obtener reservas por cliente:', error);
        res.status(500).json({ error: 'Error al obtener las reservas del cliente' });
    }
};

// Obtener estados de reserva desde la tabla maestra
const getEstadosReserva = async (req, res) => {
    try {
        const estados = await reservaModel.getEstadosReserva();
        res.json(estados);
    } catch (error) {
        console.error('Error al obtener estados de reserva:', error);
        res.status(500).json({ error: 'Error al obtener los estados de reserva' });
    }
};

// Obtener reserva por ID
const getById = async (req, res) => {
    const id = parsePositiveId(req.params.id);

    if (!id) {
        return res.status(400).json({ error: 'ID de reserva inválido' });
    }

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
        const payload = normalizeReservationData(req.body);
        const validation = validateReservationPayload(payload);

        if (!validation.valid) {
            return res.status(400).json({ error: validation.message });
        }

        const nuevaReserva = await reservaModel.create(payload);

        if (!nuevaReserva || !nuevaReserva.insertId) {
            return res.status(500).json({ error: 'No se pudo crear la reserva' });
        }

        res.status(201).json({ 
            message: "Reserva creada exitosamente",
            IDReserva: nuevaReserva.insertId
        });
    } catch (error) {
        console.error("Error al crear reserva:", error);

        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({ error: 'Alguno de los valores relacionados no existe en la base de datos' });
        }

        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Actualizar reserva
const update = async (req, res) => {
    const id = parsePositiveId(req.params.id);

    if (!id) {
        return res.status(400).json({ error: 'ID de reserva inválido' });
    }

    try {
        const payload = normalizeReservationData(req.body);
        const validation = validateReservationPayload(payload);

        if (!validation.valid) {
            return res.status(400).json({ error: validation.message });
        }

        const result = await reservaModel.update(id, payload);

        if (!result || result.affectedRows === 0) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }

        res.json({ message: "Reserva actualizada exitosamente" });
    } catch (error) {
        console.error('Error al actualizar reserva:', error);

        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({ error: 'Alguno de los valores relacionados no existe en la base de datos' });
        }

        res.status(500).json({ error: "Error al actualizar la reserva" });
    }
};

// Eliminar reserva
const remove = async (req, res) => {
    const id = parsePositiveId(req.params.id);

    if (!id) {
        return res.status(400).json({ error: 'ID de reserva inválido' });
    }

    try {
        const result = await reservaModel.delete(id);

        if (!result || result.affectedRows === 0) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }

        res.json({ message: "Reserva eliminada exitosamente" });
    } catch (error) {
        console.error("Error al eliminar reserva:", error);
        res.status(500).json({ error: "Error al eliminar la reserva" });
    }
};

module.exports = {
    list,
    getByCliente,
    getEstadosReserva,
    getById,
    create,
    update,
    remove
};
