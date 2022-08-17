const { application } = require("express") 
const express = require("express")
const {Server : HTTPServer} = require("http")
const {Server : SocketServer} = require ("socket.io")
const Contenedor = require ("./utils/container")
const contProductos = new Contenedor("./productos.json")
const contMensajes = new Contenedor("./mensajes.json")
const handlebars = require("handlebars")
const events = require("./socketEvents")

const productos = contProductos.getAll()

const app = express()

const httpServer = new HTTPServer(app)
const socketServer = new SocketServer(httpServer)

const hbs = handlebars.create({
    extname: ".hbs",
    defaultLayout: "",
    layoutsDir: __dirname + "/public/views",
    partialsDir: __dirname + "/public/views"
})

app.set("views", "./views")
app.set("view engine", "hbs")
app.engine("hbs", async () => {
    await hbs.engine})

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + ("/public/views/index.html"))
})

socketServer.on("connection", async (socket) => {
    console.log(`nuevo cliente conectado`)
    socketServer.emit(events.UPDATE_PRODUCTS, await productos)

    socket.on(events.POST_PRODUCT, async (producto) => {
        const prod = {...producto, socket_id: socket.id}
        await productos.save(prod)
        console.log(prod)
        socketServer.sockets.emit(events.NEW_PRODUCT, (prod))
    })
})


const PORT = process.env.PORT || 3000
httpServer.listen((PORT), () => {
    console.log(`Conectado al puerto: ${PORT}`)
})

