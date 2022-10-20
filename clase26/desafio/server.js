const express = require("express")
const {Server: HTTPServer} = require("http")
const {Server: SocketServer} = require("socket.io")
const connection = require("./dataBases/mongoDb/index")
const generadorMensajes = require("./utils/generadorMensaje")
const dataMensajes = require("./dataBases/posts.json")
const {normalize, schema, denormalize}= require("normalizr")
/* const productoRoutes = require("./routes/productos")
const mensajeRoutes = require("./routes/mensajes") */

const cookieParser = require("cookie-parser")
const session = require("express-session")
const MongoStore = require("connect-mongo")

const ProductoMongoContainer = require("./utils/productoMongoContainer")
const MensajeMongoContainer = require("./utils/mensajeMongoContainer")

const Producto = require("./dataBases/mongoDb/schemas/productoSchema")
const Mensaje = require("./dataBases/mongoDb/schemas/mensajeSchema")

const productos = new ProductoMongoContainer(Producto)
const mensajes = new MensajeMongoContainer(Mensaje)

const generadorProductos = require("./utils/generadorProductos")

const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const authie = require("./utils/auth/authie")
const { loginStrategy, signUpStrategy } = require("./utils/auth/passportStrategies") 
const { Types } = require("mongoose")
const User = require("./dataBases/mongoDb/schemas/userSchema")

const { urlencoded } = require("express")
const app = express()

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

/* app.use("/api/productos", productoRoutes)
app.use("/api/mensajes", mensajeRoutes) */

const handlebars = require("express-handlebars")

const hbs = handlebars.create({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/",
    partialsDir: __dirname + "/views/"
})

app.engine("hbs", hbs.engine)
app.set("views", "./views")
app.set("view engine", "hbs")

app.use(cookieParser())
app.use(session({
    store: new MongoStore({
        mongoUrl: "mongodb+srv://agussobrero:xpZFIMrxekWrDNMA@cluster0.7znzdl8.mongodb.net/authies?retryWrites=true&w=majority",
        ttl: 60 * 10
    }),
    secret: "confi123",
    resave: true,
    saveUninitialized: true
}))

passport.use("login", new LocalStrategy(loginStrategy))
passport.use("signup", new LocalStrategy({passReqToCallback: true}, signUpStrategy))

passport.serializeUser((user, done)=>{
    done(null, user._id)
})

passport.deserializeUser(async (id, done)=>{
    id = Types.ObjectId(id)
    const user = await User.findOne(id)
    done(null, user)
})

const userPass = []
userPass.push({
    user: {username: "agu@gmail", password: 123}
})

const httpServer = new HTTPServer(app)
const socketServer = new SocketServer(httpServer)

/* app.get("/", (req, res) => {
    res.sendFile(__dirname + ("/public/index.html"))
}) */

/* app.get("/test-productos", (req, res)=> {
    res.sendFile(__dirname + ("/public/indexTest.html"))
}) */

const testProductos = generadorProductos(5)
const testMensajes = generadorMensajes

socketServer.on("connection", async (socket) =>{
        console.log("nuevo cliente conectado")
        
        socket.emit("testProductos", testProductos)

        socket.emit("productoNuevo", 
        testProductos.forEach(async (producto)=>{
            await productos.save({
                nombre: producto.nombre,
                precio: producto.precio,
                foto: producto.foto
            })
        }))
        
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


//login y autentificacion

app.get("/signup", (req, res)=>{
    res.sendFile(__dirname + "/public/logs/signup.html")
})

app.post("/signup", passport.authenticate("signup", {
    failureRedirect: "/failsignup"
}),(req, res)=>{
    res.redirect("/login")
})

app.get("/failsignup", (req, res)=>{
    res.sendFile(__dirname + "/public/logs/failsignup.html")
})

app.get("/login", (req, res)=> {
    res.sendFile(__dirname + "/public/logs/login.html")
})

app.post("/login", passport.authenticate("login", {
    failureRedirect: "/faillogin"
}),(req, res)=>{
    const name = req.body.username
    req.session.user = name
    res.redirect("/")
})

app.get("/faillogin", (req, res)=>{
    res.sendFile(__dirname + "/public/logs/faillogin.html")
})

app.get("/", (req, res)=>{ 
    if (req.session.user) {
        if (req.session.visitas) {
            req.session.visitas++, 
            req.session.ultimaConexion = Date.now()
        } else {
            req.session.visitas = 1
        }
        if (req.session.visitas === 1) {
            res.render("index.hbs", {user: req.session.user, visitas: "esta es tu primer visita"}) 
        } else {
            res.render("index.hbs", {user: req.session.user, visitas: req.session.visitas})
        }
    } else {
        res.redirect("/login")
    }
})

app.use((req, res, next)=> {
    const actualConexion = Date.now()
    const tiempoTranscu = actualConexion - req.session.ultimaConexion
    if (tiempoTranscu > 60 * 1000) {
        res.redirect("/login")
    } else {
        next()
    }
})

app.post("/logout", (req, res)=> {
    req.session.destroy()
    res.redirect("/login")
})

app.get("/logout", (req, res)=> {
    res.sendFile(__dirname + "/public/logs/logout.html", {user: req.session.user})
})


const PORT = process.env.PORT || 3000
httpServer.listen((PORT), () => {
    console.log(`Conectado al puerto: ${PORT}`)
})