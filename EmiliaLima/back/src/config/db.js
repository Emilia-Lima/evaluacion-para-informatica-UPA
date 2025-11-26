import { createPool } from "mysql2/promise";

//POOL DE CONEXIÓN A LA DB
export const pool = createPool({
    host: "localhost",
    user: "root",
    password: "Ujsd#hfQ@s_15",
    database: "evaluacion_emilia_geovana_lima_palencia",
});