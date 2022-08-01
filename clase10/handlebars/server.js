const express = require("express")
const handlebars = require("express-handlebars")
const app = express()
const productos = []

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

app.post("/productos", (req, res) => {
    productos.push(req.body)
    console.log(req.body)
    res.redirect("/")
})

app.get("/productos", (req, res) => {
    res.render("tabla", {productos})
})

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Conencted to PORT: ${PORT}`)
})