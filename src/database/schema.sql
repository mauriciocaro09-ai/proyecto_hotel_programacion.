-- Script para crear la base de datos y tablas necesarias

-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS hospedaje;
USE hospedaje;

-- Crear tabla de habitaciones
CREATE TABLE IF NOT EXISTS habitacion (
    IDHabitacion INT AUTO_INCREMENT PRIMARY KEY,
    NombreHabitacion VARCHAR(100) NOT NULL,
    ImagenHabitacion VARCHAR(255),
    Descripcion TEXT,
    Costo DECIMAL(10, 2) NOT NULL,
    Estado VARCHAR(20) DEFAULT 'disponible'
);

-- Crear tabla de reservas
CREATE TABLE IF NOT EXISTS reserva (
    IDReserva INT AUTO_INCREMENT PRIMARY KEY,
    IDHabitacion INT NOT NULL,
    IDCliente INT,
    NombreCliente VARCHAR(100) NOT NULL,
    EmailCliente VARCHAR(100) NOT NULL,
    TelefonoCliente VARCHAR(20),
    FechaEntrada DATE NOT NULL,
    FechaSalida DATE NOT NULL,
    NumeroAdultos INT DEFAULT 1,
    NumeroNinos INT DEFAULT 0,
    CostoTotal DECIMAL(10, 2) NOT NULL,
    Estado VARCHAR(20) DEFAULT 'pendiente',
    FOREIGN KEY (IDHabitacion) REFERENCES habitacion(IDHabitacion)
);

-- Crear tabla de clientes
CREATE TABLE IF NOT EXISTS cliente (
    IDCliente INT AUTO_INCREMENT PRIMARY KEY,
    NombreCliente VARCHAR(100) NOT NULL,
    EmailCliente VARCHAR(100) NOT NULL,
    TelefonoCliente VARCHAR(20),
    FechaRegistro DATE DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de servicios
CREATE TABLE IF NOT EXISTS servicio (
    IDServicio INT AUTO_INCREMENT PRIMARY KEY,
    NombreServicio VARCHAR(100) NOT NULL,
    Descripcion TEXT,
    Duracion VARCHAR(50),
    CantidadMaximaPersonas INT,
    Costo DECIMAL(10, 2) NOT NULL
);

-- Insertar habitaciones de ejemplo
INSERT INTO habitacion (NombreHabitacion, Descripcion, Costo, Estado) VALUES 
('Habitación Estándar', 'Habitación cómoda con cama doble, baño privado y TV', 100000, 'disponible'),
('Habitación Deluxe', 'Habitación espaciosa con cama king, jacuzzi y vista al mar', 200000, 'disponible'),
('Suite Familiar', 'Gran habitación familiar con dos camas queen y sala de estar', 350000, 'disponible');

-- Insertar servicios de ejemplo
INSERT INTO servicio (NombreServicio, Descripcion, Duracion, CantidadMaximaPersonas, Costo) VALUES
('Spa y Masajes', 'Relajantes tratamientos de spa y masajes', '60 min', 2, 80000),
('Restaurante', 'Restaurante con comida local e internacional', '2 horas', 20, 0),
('Piscina', 'Acceso a piscina climatizada', 'todo el día', 50, 0),
('WiFi', 'Conexión a internet de alta velocidad', '24 horas', 10, 0);

-- Insertar un cliente de ejemplo
INSERT INTO cliente (NombreCliente, EmailCliente, TelefonoCliente) VALUES
('Cliente Ejemplo', 'ejemplo@email.com', '3001234567');

-- Insertar una habitación de ejemplo
INSERT INTO habitacion (NombreHabitacion, Descripcion, Costo, Estado) VALUES 
('Habitación Individual', 'Habitación económica con cama individual', 50000, 'disponible');
