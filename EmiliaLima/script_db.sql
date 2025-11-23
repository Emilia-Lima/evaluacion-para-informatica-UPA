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
    creacion DATE NOT NULL,
    estadoUsuarioId INT NOT NULL,
    CONSTRAINT fk_estado_usuario FOREIGN KEY (estadoUsuarioId) REFERENCES estadoUsuario(id)
);

INSERT INTO estadoUsuario (titulo, clave)
VALUES ('Activo', 'activo'),
       ('Baja Permanente', 'baja');

-- USUARIO CON ESTADO DE BAJA
INSERT INTO usuario (nombre, fecha, telefono, correo, creacion, estadoUsuarioId)
VALUES ('Juan Peréz', '1990-10-05', '55550000', 'juanperez@gmail.com', CURDATE(), 2);

-- USUARIOS CREADOS AYER
INSERT INTO usuario (nombre, fecha, telefono, correo, creacion, estadoUsuarioId)
VALUES
('Maria López', '1995-01-01', '55551111', 'marialopez@gmail.com', DATE_SUB(CURDATE(), INTERVAL 1 DAY), 1),
('Julio Zavala', '1995-02-02', '55552222', 'juliozavala@gmail.com', DATE_SUB(CURDATE(), INTERVAL 1 DAY), 1);

-- USUARIOS CREADOS EL MES ANTERIOR
INSERT INTO usuario (nombre, fecha, telefono, correo, creacion, estadoUsuarioId)
VALUES
('Darlin Lima', '1992-01-01', '55553333', 'darlinlima@gmail.com', DATE_SUB(CURDATE(), INTERVAL 1 MONTH), 1),
('Ana Palencia', '1992-02-02', '55554444', 'anapalencia@gmail.com', DATE_SUB(CURDATE(), INTERVAL 1 MONTH), 1);