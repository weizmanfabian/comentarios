import express from "express";
import cors from 'cors';
import defaultRoutes from './routes/defaultRoute.js'
import { port } from "./config.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/server", defaultRoutes)

app.get("/", (req, res) => {
    res.send("Estás en el servidor")
})

app.listen(port, () => console.log(`Server running on port ${port}`))