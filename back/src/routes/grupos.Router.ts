import express from "express";
import { createGrupo, editGrupos, deleteGrupos, getGrupos, adicionarMembroGrupo, deleteMembroGrupo, getGrupoUnico } from "../controllers/grupos.Controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const gruposRouter = express.Router();

gruposRouter.get( '/', authMiddleware, getGrupos)

gruposRouter.get( '/:id', authMiddleware, getGrupoUnico)

gruposRouter.post( '/', authMiddleware, createGrupo)

gruposRouter.post( '/:id/convidados/add', authMiddleware, adicionarMembroGrupo)

gruposRouter.patch( '/:id', authMiddleware, editGrupos)

gruposRouter.delete( '/:id', authMiddleware, deleteGrupos)

gruposRouter.delete( '/:id/convidados/remove', authMiddleware, deleteMembroGrupo)


export default gruposRouter;
