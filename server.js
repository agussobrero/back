const express = require("express")
const routerProductos = require("./src/routes/productos")
const routerCarritos = require("./src/routes/carrito")
const { urlencoded } = require("express")

const app = express()

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/productos", routerProductos)
app.use("/api/carrito", routerCarritos)

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Conectado al puerto: ${PORT}`)
})