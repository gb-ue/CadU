import "dotenv/config";
import express from "express";
import cors from "cors";
import eventosRouter from "./routes/eventos.Router.js"
import gruposRouter from "./routes/grupos.Router.js"
import autenticarRouter from "./routes/autenticar.Router.js"

const PORT = 8080
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());


app.use('/usuario/eventos', eventosRouter)
app.use('/usuario/grupos', gruposRouter)  
app.use('/', autenticarRouter) 


app.listen(PORT, () => {
    console.log(`Sever running on http://localhost:${PORT}`)
})