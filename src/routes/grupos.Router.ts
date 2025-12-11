import express from "express";
import { createGrupo, editGrupos, deleteGrupos, getGrupos } from "../controllers/grupos.Controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const gruposRouter = express.Router();

gruposRouter.get( '/', authMiddleware, getGrupos)

gruposRouter.post( '/', authMiddleware, createGrupo)

gruposRouter.patch( '/:id', authMiddleware, editGrupos)

gruposRouter.post( '/convidados/add', (req,res) => {
} )

gruposRouter.patch( '/convidados/edit', (req,res) => {
} )

gruposRouter.delete( '/convidados/remove', (req,res) => {
} )

gruposRouter.delete( '/:id', authMiddleware, deleteGrupos)

export default gruposRouter;
