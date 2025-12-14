import express from "express";
import { createGrupo, editGrupos, deleteGrupos, getGrupos, adicionarMembroGrupo, deleteMembroGrupo } from "../controllers/grupos.Controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const gruposRouter = express.Router();

gruposRouter.get( '/', authMiddleware, getGrupos)

gruposRouter.post( '/', authMiddleware, createGrupo)

gruposRouter.patch( '/:id', authMiddleware, editGrupos)

gruposRouter.post( '/convidados/add', authMiddleware, adicionarMembroGrupo)

// gruposRouter.patch( '/convidados/edit', (req,res) => {} )

gruposRouter.delete( '/convidados/remove', authMiddleware, deleteMembroGrupo)

gruposRouter.delete( '/:id', authMiddleware, deleteGrupos)

export default gruposRouter;
