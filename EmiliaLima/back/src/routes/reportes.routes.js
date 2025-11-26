import { Router } from "express";
import { ejecutarReporte, reporteTop } from "../controllers/reportes.controller.js";

export const reporteRouter = Router();

reporteRouter.get("/ejecutar_reporte/:reporte", ejecutarReporte);
reporteRouter.get("/reportes/top", reporteTop);