import { pool } from "../config/db.js";

import {
    regexCorreo,
    regexPunteo,
    fechaHoyIso,
} from "../utils/validators.js";

export async function guardarPunteoUsuario(req, res) {
    try {

        const { correo, punteo } = req.body;

        if (!correo || !punteo) {
            return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
        }

        if (!regexCorreo.test(correo)) {
            return res.status(400).json({ mensaje: "El correo debe ser del tipo ejemplo@dominio.com" });
        }

        if (!regexPunteo.test(punteo)) {
            return res.status(400).json({ mensaje: "El punteo debe de estar entre el número [1 - 100]" });
        }

        const fechaCreacion = fechaHoyIso();
        const conn = await pool.getConnection();

        try {

            const [usuario] = await conn.execute(
                `SELECT * FROM usuario WHERE correo = ?`, [correo]);

            if (usuario.length === 0) {
                return res.status(400).json({ mensaje: "Usuario No Existe, Revisar Correo" });
            }

            if (usuario[0].estadoUsuarioId === 2) {
                return res.status(400).json({ mensaje: "Usuario dado de baja" });
            }

            const idUsuario = usuario[0].id;

            const [result] = await conn.execute(
                `INSERT INTO punteo_usuario (idUsuario, punteo, creacion)
                 VALUES (?, ?, ?)`,
                [idUsuario, punteo, fechaCreacion]
            );

            const idInsertado = result.insertId;

            const [punteoUsuario] = await conn.execute(
                `SELECT 
                    SUM(p.punteo) as punteo,
                    u.nombre
                FROM punteo_usuario p   
                INNER JOIN usuario u on u.id = p.idUsuario             
                WHERE p.idUsuario = ?
                GROUP BY u.nombre`,
                [idUsuario]
            );

            var msj = "";

            if (punteoUsuario.length !== 0) {
                msj = `El Usuario ${usuario[0].nombre} tiene un total acumado de: ${punteoUsuario[0].punteo} puntos`;
            }

            return res.json({ id: idInsertado, mensaje: msj });

        }
        finally {
            conn.release();
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Ocurrió un error con el servidor" });
    }
}