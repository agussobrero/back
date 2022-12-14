const { Router } = require ("express")
const router = Router()
const {carritosDao} = require("../daos/index")
const authie = require ("../utils/authie")

const carrito = carritosDao

router.post("/", authie, async (req, res) => {
    await carrito.createCarrito()
    res.status(200).json({mensaje: "Carrito generado"})
})

router.delete("/:id", authie, async (req, res) => {
    const id = req.params.id || 0
    if (!id) {
        res.status(400).json({mensaje: "ID no encontrado"})
        return
    }
    deleteCarrito = await carrito.deleteById(id)
    res.status(200).json({mensaje: `Carrito eliminado id: ${id}`})
})

router.get("/:id/productos", authie, async (req, res) => {
    const id = req.params.id || 0
    if (!id) {
        res.status(400).json({mensaje: "ID no encontrado"})
        return
    }
    const carritoProducto = await carrito.getById(id)
    res.json(carritoProducto)
})

router.post("/:id/productos", authie, async (req, res) => {
    const id = req.params.id || 0
    const product = req.body
    const {nombre, descripcion, codigo, precio, stock} = product
    if (!id || !nombre || !descripcion || !codigo || !precio || !stock) {
        res.status(400).json({mensaje: "Datos requeridos"})
        return
    }
    updateCarrito = await carrito.addProduct(id, product)
    res.status(200).json({mensaje: `Producto agregado al carrito con id: ${id}`})
})

router.delete("/:id/productos/:id_prod", authie, async (req, res) => {
    const id = req.params.id || 0
    const id_prod = req.params.id_prod || 0
    if (!id || !id_prod) {
        res.status(400).json({mensaje: "ID no encontrado"})
        return
    }
    deleteProducto = await carrito.deleteProduct(id, id_prod)
    res.status(200).json({mensaje: `Producto eliminado del carrito con id: ${id}`})
})

module.exports = router