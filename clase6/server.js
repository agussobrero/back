const express = require("express")
const app = express()

const PORT= process.env.PORT || 3000

const Container = require("./container")

const container = new Container ("products.json")

const server = app.listen(PORT, (req, res) => {
    console.log(`Servidor esuchando el puerto ${PORT}`)
})

app.get("/", (req, res) => {
    res.send("<h1>Funciona?</h1>")
})

app.get("/productos", (req, res) =>{
    container.getAll().then(
        products => res.send(products)
    )
})

app.get("/productoRandom", (req,res) =>{
    container.getRandom().then(
        product=> res.send(product)
    )
})