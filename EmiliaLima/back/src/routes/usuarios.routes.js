import { Router } from "express";
import { guardarUsuario } from "../controllers/usuarios.controller.js";

export const usuarioRouter = Router();

usuarioRouter.post("/guardar_usuario", guardarUsuario);