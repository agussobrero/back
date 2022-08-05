const express = require("express")
const ejs = require("ejs")
const Container = require("./utils/container")
const app = express()
const productos = []

const container = new Container ("./utils/products.json")

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.get("/allProd", async (req, res) => {
    let productos
    try{
        productos = await container.getAll()
    } catch (err) {
        console.log(err)
    }
    res.render("main.ejs", {productos})
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

app.delete("/delete/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    let producto
    try{
        producto = await container.deleteById(id)
    } catch (err) {
        console.log(err)
    }
    res.send(producto)
})


const PORT = 8080

app.listen(PORT, () => {
    console.log(`Connected to PORT:${PORT}`)
})