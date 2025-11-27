import express from "express";
const eventosRouter = express.Router();

eventosRouter.get( '/', (req,res) => {
} )

eventosRouter.post( '/', (req,res) => {
} )

eventosRouter.patch( '/:id', (req,res) => {
} )

eventosRouter.delete( '/:id', (req,res) => {
} )

eventosRouter.post( '/aceitar-convite', (req,res) => {
} )

eventosRouter.patch( '/desmarcar-presenca', (req,res) => {
} )

eventosRouter.get( '/:id/faltas', (req,res) => {
} )

eventosRouter.patch( '/:id/faltas', (req,res) => {
} )

export default eventosRouter;
