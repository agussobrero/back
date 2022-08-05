const express = require("express")
const pug = require("pug")
const Container = require("./utils/container")
const app = express()
const productos = []

const container = new Container ("./utils/products.json")

app.set("view engine", "pug")
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index.pug")
})

app.get("/allProd", async (req, res) => {
    let productos
    try{
        productos = await container.getAll()
    } catch (err) {
        console.log(err)
    }
    res.render("main.pug", {productos})
})


app.post("/createProd", async (req, res) => {
    const producto = req.body
    console.log(producto)
    let prodNuevo
    try{
        prodNuevo = await container.save(producto)
    } catch (err) {
        console.log(err)
    }
    res.redirect("/allProd")
})


const PORT = 8080

app.listen(PORT, () => {
    console.log(`Connected to PORT:${PORT}`)
})