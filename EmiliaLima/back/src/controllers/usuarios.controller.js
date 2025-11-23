import { pool } from "../config/db.js";
import {
    regexNombre,
    regexFecha,
    regexTelefono,
    regexCorreo,
    calcularEdad,
    convertirFechaDdMmYyyyAIso,
    fechaHoyIso,
} from "../utils/validators.js";

export async function guardarUsuario(req, res) {
    try {
        const { nombre, fechaNacimiento, telefono, correo } = req.body;

        if (!nombre || !fechaNacimiento || !telefono || !correo) {
            return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
        }

        if (!regexNombre.test(nombre)) {
            return res.status(400).json({ mensaje: "El nombre solo debe contener letras y espacios" });
        }

        if (!regexFecha.test(fechaNacimiento)) {
            return res.status(400).json({ mensaje: "La fecha debe tener el formato dd-mm-YYYY" });
        }

        if (!regexTelefono.test(telefono)) {
            return res.status(400).json({ mensaje: "El teléfono solo debe contener número [0-9]" });
        }

        if (!regexCorreo.test(correo)) {
            return res.status(400).json({ mensaje: "El correo debe ser del tipo ejemplo@dominio.com" });
        }

        const edad = calcularEdad(fechaNacimiento);
        if (edad === null) {
            return res.status(400).json({ mensaje: "Fecha de Nacimiento Inválida" });
        }

        if (edad < 18) {
            return res.status(400).json({ mensaje: "El usuario no es mayor de edad, no se puede continuar" });
        }

        const fechaSQL = convertirFechaDdMmYyyyAIso(fechaNacimiento);
        const fechaCreacion = fechaHoyIso();

        const conn = await pool.getConnection();

        try {
            const [result] = await conn.execute(
                `INSERT INTO usuario (nombre, fecha, telefono, correo, creacion, estadoUsuarioId)
            VALUES (?, ?, ?, ?, ?, ?)`,
                [nombre, fechaSQL, telefono, correo, fechaCreacion, 1]
            );

            const idInsertado = result.insertId;
            return res.json({ id: idInsertado, mensaje: "Usuario almacenado correctamente" });
        }
        finally {
            conn.release();
        }

    } catch (error) {
        console.error("Error en guardarUsuario:", error);
        return res.status(500).json({ mensaje: "Ocurrión un error en el servidor" });
    }
}

