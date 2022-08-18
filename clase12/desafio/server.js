const express = require("express")
const {Server: HTTPServer} = require("http")
const {Server: SocketServer} = require("socket.io")
const productoRoutes = require("./routes/producto")
const Contenedor = require ("./utils/container")
const productos = new Contenedor("./productos.json")

const app = express()

const httpServer = new HTTPServer(app)
const socketServer = new SocketServer(httpServer)

app.use(express.static("public"))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(("/producto", productoRoutes))

app.get("/", (req, res) => {
    res.sendFile(__dirname + ("/public/index.html"))
})

socketServer.on("connection", (socket) =>{
    console.log("nuevo cliente conectado")
    socket.emit("productosRegistrados", productos.getAll())

    socket.on("productoNuevo", (producto) =>{
        productos.save(producto)
        socket.emit("productosRegistrados", productos.getAll())
    })
})


const PORT = process.env.PORT || 3000
httpServer.listen((PORT), () => {
    console.log(`Conectado al puerto: ${PORT}`)
})