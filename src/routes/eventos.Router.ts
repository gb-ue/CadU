import express from "express";
import { createEvento, editarEvento, deleteEvento, getEvento, ocultarEventoUnico, ocultarEventosPorCAtegoria, faltarEvento, getFaltasEvento } from "../controllers/eventos.Controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const eventosRouter = express.Router();

eventosRouter.get( '/', authMiddleware, getEvento)

eventosRouter.post( '/create', authMiddleware, createEvento)

eventosRouter.patch( '/:id', authMiddleware, editarEvento)

eventosRouter.delete( '/:id', authMiddleware, deleteEvento)

eventosRouter.patch( '/categorias/hide', authMiddleware,ocultarEventosPorCAtegoria)

eventosRouter.patch( '/:id/hide', authMiddleware, ocultarEventoUnico)

eventosRouter.patch( '/desmarcar-presenca', authMiddleware, faltarEvento)

eventosRouter.get( '/:id/faltas', authMiddleware, getFaltasEvento)

eventosRouter.patch( '/:id/faltas', (req,res) => {
} )

export default eventosRouter;
