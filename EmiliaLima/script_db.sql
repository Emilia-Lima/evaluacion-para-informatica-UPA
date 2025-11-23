CREATE DATABASE IF NOT EXISTS evaluacion_emilia_geovana_lima_palencia;

USE evaluacion_emilia_geovana_lima_palencia;

CREATE TABLE estadoUsuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(50) NOT NULL,
    clave VARCHAR(50) NOT NULL
);

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    fecha DATE NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    correo VARCHAR(150) NOT NULL,
    creacion DATETIME NOT NULL,
    estadoUsuarioId INT NOT NULL,
    CONSTRAINT fk_estado_usuario FOREIGN KEY (estadoUsuarioId) REFERENCES estadoUsuario(id)
);

INSERT INTO estadoUsuario (titulo, clave)
VALUES ('Activo', 'activo'),
       ('Baja Permanente', 'baja');