import { pool } from "../config/db.js";

export async function ejecutarReporte(req, res) {
    const codigo = req.params.reporte;

    if (!codigo) {
        return res.status(500).json({ mensaje: "Ocurrió un error inesperado" });
    }

    try {
        const conn = await pool.getConnection();

        try {
            let query = "";
            let params = [];

            if (codigo === "todos_usuarios") {
                query = `
                SELECT u.id, u.nombre, u.fecha, u.telefono, u.correo, u.creacion, e.titulo as estado
                FROM usuario u
                INNER JOIN estadoUsuario e on e.id = u.estadoUsuarioId
                ORDER BY u.id ASC
                `;
            } else if (codigo === "usuarios_hoy") {
                query = `
                SELECT u.id, u.nombre, u.fecha, u.telefono, u.correo, u.creacion, e.titulo as estado
                FROM usuario u
                INNER JOIN estadoUsuario e on e.id = u.estadoUsuarioId
                WHERE u.creacion = CURDATE()
                ORDER BY u.id ASC
                `;
            } else if (codigo === "usuarios_ayer") {
                query = `
                SELECT u.id, u.nombre, u.fecha, u.telefono, u.correo, u.creacion, e.titulo as estado
                FROM usuario u
                INNER JOIN estadoUsuario e on e.id = u.estadoUsuarioId
                WHERE u.creacion = DATE_SUB(CURDATE(), INTERVAL 1 DAY)
                ORDER BY u.id ASC
                `;
            } else {
                return res.status(500).json({ mensaje: "El código del reporte no es válido" });
            }

            const [rows] = await conn.execute(query, params);
            return res.json(rows);
        }
        finally {
            conn.release();
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: error.mensaje });

    }
}