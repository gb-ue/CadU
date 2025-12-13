import "dotenv/config";
import express from "express";
import cors from "cors";

import eventosRouter from "./routes/eventos.Router.js";
import categoriasRouter from "./routes/categorias.Router.js";
import gruposRouter from "./routes/grupos.Router.js";
import autenticarRouter from "./routes/autenticar.Router.js";

const PORT = 8080;
const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

app.use('/usuario/eventos', eventosRouter);
app.use('/usuario/categorias', categoriasRouter);
app.use('/usuario/grupos', gruposRouter);
app.use('/', autenticarRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
