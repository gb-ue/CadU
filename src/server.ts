import express from "express"; 
import type { Request, Response} from "express";
const PORT = 3000

const app = express();


app.listen(PORT, () => {
    console.log(`Sever running on Port ${PORT}`)

})