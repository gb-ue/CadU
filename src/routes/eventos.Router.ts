import express from "express";
import { createEvento, editarEvento, deleteEvento, getEvento } from "../controllers/eventos.Controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const eventosRouter = express.Router();

eventosRouter.get( '/', authMiddleware, getEvento)

eventosRouter.post( '/create', authMiddleware, createEvento)

eventosRouter.patch( '/:id', authMiddleware, editarEvento)

eventosRouter.delete( '/:id', authMiddleware, deleteEvento)

eventosRouter.patch( '/evento/hide', (req,res) => {
} )

eventosRouter.patch( '/categorias/hide', (req, res)=> {
})

eventosRouter.patch( '/desmarcar-presenca', (req,res) => {
} )

eventosRouter.get( '/:id/faltas', (req,res) => {
} )

eventosRouter.patch( '/:id/faltas', (req,res) => {
} )

export default eventosRouter;
