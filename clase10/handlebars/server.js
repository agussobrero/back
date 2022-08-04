const express = require("express")
const handlebars = require("express-handlebars")
const Container = require("./utils/container")
const app = express()
const productos = []

const container = new Container ("./utils/products.json")

const hbs = handlebars.create({
    extname: ".hbs",
    defaultLayout: "",
    layoutsDir: __dirname + "/views/",
    partialsDir: __dirname + "/views/"
})

app.engine("hbs", hbs.engine)
app.set("views", "./views")
app.set("view engine", "hbs")

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/productos", async(req, res) => {
    let productos 
    try {
        productos = await container.getAll()
    } catch (err) {
        console.log(err)
    }
    res.render("main", {productos})
})

app.post("/productos", async (req, res) => {
    console.log(req.body)
    const producto = req.body
    console.log(req.body)
    console.log(producto)
    let prodNuevo
    try{
        prodNuevo = await container.save(producto)
    } catch (err) {
        console.log(err)
    }
    res.redirect("/productos")
})

/* app.get("/productos", (req, res) => {
    res.render("tabla", {productos})
}) */

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Conencted to PORT: ${PORT}`)
})


/* socket.on('productosActualizado', (dato) => {
    fetch('http://localhost:8080/table.handlebars')
        .then(data => data.text())
        .then(response => {
            let nuevoRender = Handlebars.compile(response);
            let html = nuevoRender({ listaDeProductos: dato });
            document.getElementById('destino').innerHTML = html;
        })

        ...
const app = express();
const httpServer = new HttpServer(app);
const io = new socket...
...

app.use('/api/productos', rutas);
app.get('/', (req, res) => {
    res.render('./table', {lista...});
})


io.on('connection', (socket) => {

    cargarProductos(); //envia productos cuando alguien se conecta
    
    . ...
    socket.on('nuevoMensaje', (dato) => {
        ...

    })
})
}) */