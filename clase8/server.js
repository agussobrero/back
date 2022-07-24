const express = require("express")
const app = express()

const PORT = 3000

const Container = require("./container")
const container = new Container ("./products.json")
const routerProductos = require("./routes/productos")
const upload = require("./storage")

const server = app.listen(PORT, (rep, res) => {
    console.log(`Escuchando el puerto ${PORT}`)
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/", (req, res) => res.sendFile(__dirname + "/public/index.html"))

app.get("/", (req, res) => {
    res.send("<h1>Funciona????</h1>")
})

app.get("/api/productos", (req, res) => {
    container.getAll().then(
        productos => res.json(productos)
        )

    //de este modo no me funciona, entiendo que es algo del contenedor. No me codifica si agrego (productos,null, 2)
    /* const productos = container.getAll()
    res.json(productos) */
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

app.get("/api/productos", upload.single("foto"), (req, res) => {
    const file = req.file
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

app.use("/api/productos2", routerProductos)

server.on("error", error => console.log(`Error: ${error}`))