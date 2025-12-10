import express from "express";
import { login } from "../controllers/autenticar.Controller.js";
import { cadastro } from "../controllers/autenticar.Controller.js";
const autenticarRouter = express.Router();

autenticarRouter.post( '/login', login)

autenticarRouter.post( '/cadastro', cadastro )

export default autenticarRouter;
