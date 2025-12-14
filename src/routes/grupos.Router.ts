import express from "express";
import { createGrupo, editGrupos, deleteGrupos, getGrupos, adicionarMembroGrupo, deleteMembroGrupo } from "../controllers/grupos.Controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const gruposRouter = express.Router();

gruposRouter.get( '/', authMiddleware, getGrupos)

gruposRouter.post( '/', authMiddleware, createGrupo)

gruposRouter.post( '/:id/convidados/add', authMiddleware, adicionarMembroGrupo)

gruposRouter.patch( '/:id', authMiddleware, editGrupos)

gruposRouter.delete( '/:id', authMiddleware, deleteGrupos)

gruposRouter.delete( '/convidados/remove', authMiddleware, deleteMembroGrupo)


export default gruposRouter;
