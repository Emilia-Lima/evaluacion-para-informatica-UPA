import express from "express";
import cors from "cors";

import { usuarioRouter } from "./src/routes/usuarios.routes.js";
import { reporteRouter } from "./src/routes/reportes.routes.js";

//CONFIGURACIÓN
const app = express();
const PORT = 3000;

//MIDDLEWARES
app.use(cors());
app.use(express.json());

//RUTAS
app.use(usuarioRouter);
app.use(reporteRouter);

//ARRANQUE SERVIDOR
app.listen(PORT, ()=> {
    console.log('Servidor escuchando en el puerto', PORT);
});


