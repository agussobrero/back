const express = require("express")
const routerProductos = require("./src/routes/productos")
const routerCarritos = require("./src/routes/carritos")
const routerAuth = require("./src/routes/auth")
const { urlencoded } = require("express")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const { passport } = require("./src/middlewares/auth/passport")

const cluster = require("cluster")
const numCPUs = require("os").cpus().length
const { MODE, PORT} = require("./src/config/configConst")

const compression = require("compression")
const logger = require("./loggers/loggerConfig")

const handlebars = require("express-handlebars")

const app = express()

const hbs = handlebars.create({
    extname: ".hbs",
    defaultLayout: "",
    layoutsDir: __dirname + "/views/",
    partialsDir: __dirname + "/views/"
})

app.engine("hbs", hbs.engine)
app.set("views", "/Users/AguS/Documents/Code/Coder House/Back/clase36/public/views")
app.set("view engine", "hbs")

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

//session config
const { sessionConfig } = require("./src/middlewares/sessionConfig")
app.use(session(sessionConfig))

//passport config
app.use(passport.initialize())
app.use(passport.session())

//routers
app.use("/productos", routerProductos)
app.use("/carritos", routerCarritos)
app.use("/auth", routerAuth)

//cluster config
if (MODE === "cluster" && cluster.isMaster) {
    for (let i = 0; i < numCPUs.length; i++) {
        cluster.fork();
        console.log(cluster.fork)
    }
    cluster.on("exit", (worker) => {
        logger.log("warn", `worker caido nº: ${cluster.process.id}`)
        cluster.fork()
    })
} else {
    app.listen(PORT, () => {
    logger.log("info", `Coneccion Exitosa puerto: ${PORT}`)
})
    app.get("*", (req, res)=>{
        logger.log("warn", `Ruta: ${req.url} no encontrada`)
    })
    app.on("error", err => {
        logger.log("error", `No se puede contectar, error: ${err}`)
    })
}

/* module.exports = app */