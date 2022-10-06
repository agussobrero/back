const express = require("express")
const {Server: HTTPServer} = require("http")
const {Server: SocketServer} = require("socket.io")
const connection = require("./dataBases/mongoDb/index")
/* const productoRoutes = require("./routes/productos")
const mensajeRoutes = require("./routes/mensajes") */

const ProductoMongoContainer = require("./utils/productoMongoContainer")
const MensajeMongoContainer = require("./utils/mensajeMongoContainer")

const Producto = require("./dataBases/mongoDb/schemas/productoSchema")
const Mensaje = require("./dataBases/mongoDb/schemas/mensajeSchema")

const productos = new ProductoMongoContainer(Producto)
const mensajes = new MensajeMongoContainer(Mensaje)

const generadorProductos = require("./utils/generadorProductos")

const { urlencoded } = require("express")
const app = express()

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

/* app.use("/api/productos", productoRoutes)
app.use("/api/mensajes", mensajeRoutes) */

const httpServer = new HTTPServer(app)
const socketServer = new SocketServer(httpServer)

app.get("/", (req, res) => {
    res.sendFile(__dirname + ("/public/index.html"))
})

app.get("/test-productos", (req, res)=> {
    res.sendFile(__dirname + ("/public/indexTest.html"))
})

const testProductos = generadorProductos(5)

socketServer.on("connection", async (socket) =>{
        console.log("nuevo cliente conectado")
        
        socket.emit("testProductos", testProductos)

        socket.emit("productoNuevo", await productos.save(testProductos.map((producto)=> {
            console.log(producto)
            return{
                nombre: producto.nombre,
                precio: producto.precio,
                foto: producto.foto
            }
        }))
        )
        /* socket.on("productosRegistrados", await productos.getAll()) */
        
        /* socket.emit("productosRegistrados", productos.getAll()) */


//Mensajes

    socket.emit("mensajesRegistrados", await mensajes.getAll())

    socket.on("mensajeNuevo", async (mensaje) => {
        await mensajes.save(mensaje)

        socket.emit("mensajesRegistrados", mensajes.getAll())
    })
})

const PORT = process.env.PORT || 3000
httpServer.listen((PORT), () => {
    console.log(`Conectado al puerto: ${PORT}`)
})