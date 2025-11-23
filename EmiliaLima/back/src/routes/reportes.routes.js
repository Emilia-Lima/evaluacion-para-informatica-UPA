import { Router } from "express";
import { ejecutarReporte } from "../controllers/reportes.controller.js";

export const reporteRouter = Router();

reporteRouter.get("/ejecutar_reporte/:reporte", ejecutarReporte);