const db = require("../database/connection");

// Cliente Model - Define la estructura de la tabla cliente

const ClienteModel = {
    // Obtener todos los clientes
    findAll: async () => {
        const [rows] = await db.query("SELECT * FROM cliente");
        return rows;
    },

    // Obtener cliente por ID
    findById: async (id) => {
        const [rows] = await db.query("SELECT * FROM cliente WHERE IDCliente = ?", [id]);
        return rows[0];
    },

    // Crear nuevo cliente
    create: async (clienteData) => {
        const { Nombre, Apellido, CorreoElectronico, Telefono, Direccion, NumeroDocumento, TipoDocumento } = clienteData;
        const [result] = await db.query(
            "INSERT INTO cliente (Nombre, Apellido, CorreoElectronico, Telefono, Direccion, NumeroDocumento, TipoDocumento) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [Nombre, Apellido, CorreoElectronico, Telefono, Direccion, NumeroDocumento, TipoDocumento]
        );
        return result;
    },

    // Actualizar cliente
    update: async (id, clienteData) => {
        const { Nombre, Apellido, CorreoElectronico, Telefono, Direccion, NumeroDocumento, TipoDocumento } = clienteData;
        const [result] = await db.query(
            "UPDATE cliente SET Nombre = ?, Apellido = ?, CorreoElectronico = ?, Telefono = ?, Direccion = ?, NumeroDocumento = ?, TipoDocumento = ? WHERE IDCliente = ?",
            [Nombre, Apellido, CorreoElectronico, Telefono, Direccion, NumeroDocumento, TipoDocumento, id]
        );
        return result;
    },

    // Eliminar cliente
    delete: async (id) => {
        const [result] = await db.query("DELETE FROM cliente WHERE IDCliente = ?", [id]);
        return result;
    }
};

module.exports = ClienteModel;
