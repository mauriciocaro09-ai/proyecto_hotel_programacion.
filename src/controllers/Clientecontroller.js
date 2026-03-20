const db = require("../database/connection");

// Get all clients / list
const list = async (req, res) => {
    try {
        const [clientes] = await db.query("SELECT * FROM cliente")
        res.json(clientes)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los clientes" })
    }
}

// Get client by ID
const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query("SELECT * FROM cliente WHERE IDCliente = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el cliente" });
    }
};

// CREATE cliente POST
const create = async (req, res) => { 
    const {  Nombre, Apellido, CorreoElectronico, Telefono, Direccion, NumeroDocumento, TipoDocumento } = req.body;
    try {
        await db.query(
            "INSERT INTO cliente (Nombre, Apellido, CorreoElectronico, Telefono, Direccion, NumeroDocumento, TipoDocumento) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [Nombre, Apellido, CorreoElectronico, Telefono, Direccion, NumeroDocumento, TipoDocumento]
        )
        res.status(201).json({ message: "Cliente creado exitosamente"});
    } catch (error) {
        res.status(500).json({ error: "Error al crear el cliente" });
    }
}

// UPDATE cliente PUT
const update = async (req, res) => {
    const { id } = req.params;
    const { Nombre, Apellido, CorreoElectronico, Telefono, Direccion, NumeroDocumento, TipoDocumento } = req.body; 
    try {
        await db.query(
            "UPDATE cliente SET Nombre = ?, Apellido = ?, CorreoElectronico = ?, Telefono = ?, Direccion = ?, NumeroDocumento = ?, TipoDocumento = ? WHERE IDCliente = ?",
            [Nombre, Apellido, CorreoElectronico, Telefono, Direccion, NumeroDocumento, TipoDocumento, id]
        )
        res.json({ message: "Cliente actualizado exitosamente" })
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el cliente" })
    }
}   

// DELETE cliente
const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM cliente WHERE IDCliente = ?", [id])
        res.json({ message: "Cliente eliminado exitosamente" })
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el cliente" })
    }
}

module.exports = {
    list,
    getById,
    create,
    update,
    remove
}
