import express from "express"; 
import eventosRouter from "./routes/eventos.Router.js"
import categoriasRouter from "./routes/categorias.Router.js"
import gruposRouter from "./routes/grupos.Router.js"
import autenticarRouter from "./routes/autenticar.Router.js"

const PORT = 3000
const app = express();

app.use('/usuario/eventos', eventosRouter)
app.use('/usuario/categorias', categoriasRouter) 
app.use('/usuario/grupos', gruposRouter)  
app.use('/', autenticarRouter) 


app.listen(PORT, () => {
    console.log(`Sever running on http://localhost:${PORT}`)

})