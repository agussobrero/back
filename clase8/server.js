const express = require("express")
const app = express()

const PORT = 8080

const Container = require("./utils/container")
const container = new Container ("./products.json")
const routerProductos = require("./routes/productos")
const upload = require("./storage")

const server = app.listen(PORT, (rep, res) => {
    console.log(`Escuchando el puerto ${PORT}`)
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/api/productonuevo", (req, res) => res.sendFile(__dirname + "/public/index.html"))

app.get("/", (req, res) => {
    res.send("<h1>Funciona</h1>")
})

app.get("/api/productos", (req, res) => {
    container.getAll().then(
        productos => res.json(productos)
        )
})

app.get("/api/productos/:id", (req, res) => {
    const id = parseInt(req.params.id)
    container.getById(id).then(
        producto => res.json(producto)
    )
})

app.post("/api/productos", (req, res) => {
    res.json({mensaje: "ok post"})
})


app.put("/api/productos/:id", (req, res) => {
    const id = req.params.id
    res.json({
        nensaje: "ok put",
        id: req.params.id,
        nuevo: req.body
    })
})

app.delete("/api/productos/:id", (req, res) => {
    const id = req.params.id
    res.json({
        nensaje: "ok delete",
        id: req.params.id,
        nuevo: req.body
    })
})

app.post("/api/productonuevo", upload.single("foto"), (req, res) => {
    const file = req.file
    res.json({mensaje: "ok post"})
})

app.use("/api/productos2", routerProductos)

server.on("error", error => console.log(`Error: ${error}`))