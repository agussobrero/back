const express = require("express")
const {Server: HTTPServer} = require("http")
/* const {Server: SocketServer} = require("socket.io") */
const { urlencoded } = require("express")
const { PORT } = require("./src/config/config")
const hbs = require("./src/views/config/index")

const app = express()

//Routers
const ProductosRouter = require("./src/routes/ProductosRouter")
const MensajesRouter = require("./src/routes/MensajesRouter")


//Engine
app.engine("hbs", hbs.engine)
app.set("views", "./src/views/")
app.set("view engine", "hbs")

/* const Contenedor = require ("./src/containers/contenedorProducto")
const productos = new Contenedor("./productos.json")
const mensajes = new Contenedor("./mensajes.json") */

/* app.use(express.static("public")) */
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/productos", ProductosRouter)
app.use("/mensajes", MensajesRouter)

const httpServer = new HTTPServer(app)
/* const socketServer = new SocketServer(httpServer) */

app.get("/", (req, res) => {
    res.sendFile(__dirname + ("/public/index.html"))
})

/* socketServer.on("connection", async (socket) =>{
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
}) */

httpServer.listen((PORT), () => {
    console.log(`Conectado al puerto: ${PORT}`)
})