import express from "express";
import cors from "cors";

import { usuarioRouter } from "./src/routes/usuarios.routes.js"

//CONFIGURACIÓN
const app = express();
const PORT = 3000;

//MIDDLEWARES
app.use(cors());
app.use(express.json());

//RUTAS
app.use(usuarioRouter);

//ARRANQUE SERVIDOR
app.listen(PORT, ()=> {
    console.log('Servidor escuchando en el puerto', PORT);
});


