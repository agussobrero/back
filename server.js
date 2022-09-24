const express = require("express")
const routerProducto = require("./src/routes/productos")
const routerCarrito = require("./src/routes/carrito")
const { urlencoded } = require("express")

const app = express()

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/productos", routerProducto)
app.use("/api/carrito", routerCarrito)

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Conectado al puerto: ${PORT}`)
})