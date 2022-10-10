const express = require("express")
const {Server: HTTPServer} = require("http")
const {Server: SocketServer} = require("socket.io")
const connection = require("./dataBases/mongoDb/index")
const generadorMensajes = require("./utils/generadorMensaje")
const dataMensajes = require("./dataBases/posts.json")
const {normalize, schema, denormalize}= require("normalizr")
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
const testMensajes = generadorMensajes

socketServer.on("connection", async (socket) =>{
        console.log("nuevo cliente conectado")
        

        socket.emit("testProductos", testProductos)

        /* socket.emit("productoNuevo", 
        testProductos.forEach(async (producto)=>{
            await productos.save({
                nombre: producto.nombre,
                precio: producto.precio,
                foto: producto.foto
            })
        })) */
        
        socket.emit("productosRegistrados", await productos.getAll())


//Mensajes
        const mensajesData = await mensajes.getAll() 
        const mensajesNorm = JSON.stringify(mensajesData,null, 2)
        /* const author = new schema.Entity('author', {}, {idAttribute: 'email'})
        const comments = new schema.Entity('comment', {author}, {idAttribute: '_id'})
        const mensajesDeNorm = denormalize(mensajesNorm.result, [comments], mensajesNorm.entities) */

        socket.emit("mensajesNormalizados", mensajesNorm)

        socket.on("mensajePost", async (mensaje) => {
        await mensajes.save(mensaje)

        socket.emit("mensajeRegistrado", mensaje)
    })
})

const PORT = process.env.PORT || 3000
httpServer.listen((PORT), () => {
    console.log(`Conectado al puerto: ${PORT}`)
})