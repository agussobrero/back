const express = require("express")
const {Server: HTTPServer} = require("http")
const {Server: SocketServer} = require("socket.io")
const productoRoutes = require("./routes/producto")
const mensajeRoutes = require("./routes/mensaje")
const Contenedor = require ("./utils/container")
const productos = new Contenedor("./productos.json")
const mensajes = new Contenedor("./mensajes.json")

const app = express()

const httpServer = new HTTPServer(app)
const socketServer = new SocketServer(httpServer)

app.use(express.static("public"))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(("/producto", productoRoutes))
app.use(("/mensaje", mensajeRoutes))

app.get("/", (req, res) => {
    res.sendFile(__dirname + ("/public/index.html"))
})

socketServer.on("connection", async (socket) =>{
        console.log("nuevo cliente conectado")

        socket.emit("productosRegistrados", await productos.getAll())

    socket.on("productoNuevo", async (producto) =>{
        await productos.save(producto)
        
        socket.emit("productosRegistrados", productos.getAll())
    })

//Mensajes

    socket.emit("mensajesRegistrados", await mensajes.getAll())

    socket.on("mensajeNuevo", async (mensaje) => {
        await mensajes.save(mensaje)

        socket.emit("mensajesRegistrados", mensajes.getAll())
    })
})

const PORT = process.env.PORT || 3306
httpServer.listen((PORT), () => {
    console.log(`Conectado al puerto: ${PORT}`)
})