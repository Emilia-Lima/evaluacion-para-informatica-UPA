import { Router } from "express";
import {
    guardarUsuario,
} from "../controllers/usuarios.controller.js";

import {
    guardarPunteoUsuario
} from "../controllers/punteousuarios.controller.js"

export const usuarioRouter = Router();

usuarioRouter.post("/guardar_usuario", guardarUsuario);
usuarioRouter.post("/ingresar_punteo", guardarPunteoUsuario);