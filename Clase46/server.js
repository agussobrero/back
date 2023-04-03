const express = require("express")
const { Server: HTTPServer } = require("http")
const { Server: SocketServer } = require("socket.io")
const { PORT, MODE } = require("./src/config/config")
const connection = require("./src/database/connection")

connection()

const ProductosRouter = require("./src/routes/ProductosRouter")
const MensajesRouter = require("./src/routes/MensajesRouter")

const cluster = require("cluster")
const numCPUs = require("os").cpus().length


const cookieParser = require("cookie-parser")
const session = require("express-session")
const MongoStore = require("connect-mongo")

const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const authie = require("./src/utils/auth/authie")
const { loginStrategy, signUpStrategy } = require("./src/utils/auth/passportStrategies") 
const { Types } = require("mongoose")
const User = require("./src/database/schemas/user")

const compression = require("compression")
const logger = require("./src/utils/loggers/loggerConfig.")

const { urlencoded } = require("express")
const cors = require("cors")
const app = express()

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use("/productos", ProductosRouter)
app.use("/mensajes", MensajesRouter)

const handlebars = require("express-handlebars")
const Handlebars = require("handlebars")
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const { platform } = require("os")
const { url } = require("inspector")

const hbs = handlebars.create({
    extname: ".hbs",
    defaultLayout: "",
    layoutsDir: __dirname + "/views/",
    partialsDir: __dirname + "/views/",
    allowedProtoProperties: true,
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine("hbs", hbs.engine)

app.set("views", "./src/views")
app.set("view engine", "hbs")

app.use(cookieParser())
app.use(session({
    store: new MongoStore({
        mongoUrl: "mongodb+srv://agussobrero:xpZFIMrxekWrDNMA@cluster0.7znzdl8.mongodb.net/clase40-2?retryWrites=true&w=majority",
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

/* const {graphqlHTTP} = require("express-graphql") */
/* const { schema, root } = require("./src/graphql") */

/* app.use("/graphql", graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
})) */

const httpServer = new HTTPServer(app)
const socketServer = new SocketServer(httpServer)

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

        socket.emit("mensajesNormalizados", mensajesNorm)

        socket.on("mensajePost", async (mensaje) => {
        await mensajes.save(mensaje)

        socket.emit("mensajeRegistrado", mensaje)
    })
})


//login y autentificacion

if (MODE === "cluster" && cluster.isMaster) {
    for(let i=0; i < numCPUs; i++) {
        cluster.fork()
    }
    cluster.on("exit", (worker)=>{
        console.log(`proceso caido nº: ${worker.process.pid}`)
        cluster.fork()
    })
} else {
    
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
            res.render("index2.hbs", {user: req.session.user, visitas: "esta es tu primer visita"}) 
        } else {
            res.render("index2.hbs", {user: req.session.user, visitas: req.session.visitas})
        }
    } else {
        /* res.redirect("/login") */
    }
})

app.use((req, res, next)=> {
    const actualConexion = Date.now()
    const tiempoTranscu = actualConexion - req.session.ultimaConexion
    if (tiempoTranscu > 60 * 1000) {
        /* res.redirect("/login") */
    } else {
        next()
    }
})

app.post("/logout", (req, res)=> {
    req.session.destroy()
    res.redirect("/login")
})

app.get("/logout", (req, res)=> {
    res.sendFile(__dirname + "/public/logs/logout.html")
})

//Child Process

app.get("/info", compression(), (req, res)=>{
    const processInfo = {
        args: process.argv.slice(2),
        os: process.platform,
        nodeVersion: process.version,
        memoria: process.memoryUsage().rss,
        path: process.cwd(),
        processId: process.pid,
        carpeta: process.execPath,
        procesadores: numCPUs
    }
    logger.log("info", "Peticion Exitosa")
    res.render("info.hbs", processInfo)
    /* console.log(processInfo) */
})

app.get("*", (req, res)=>{
    logger.log("warn", `Ruta: ${req.url} no encontrada`)
})

httpServer.listen((PORT), () => {
    console.log(`Conectado al puerto: ${PORT}`)
})

} 
