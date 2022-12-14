const { Router } = require ("express")
const router = Router()
const {productosDao} = require("../daos/index")
const authie = require ("../utils/authie")

const productos = productosDao

router.get("/", async (req, res) => {
    listaProductos = await productos.getAll()
    res.json(listaProductos)
})

router.get("/:id", async (req, res) => {
    const id = req.params.id || 0
    if (!id) {
        res.status(400).json({mensaje: "ID no encontrado"})
        return
    }
    const productoId = await productos.getById(id)
    if (!productoId) {
        res.status(400).json({mensaje: "Producto no encontrado"})
        return
    }
    res.json(productoId)
})

router.post("/", authie, async (req, res) => {
    const objetoNuevo = req.body
    const {nombre, descripcion, codigo, precio, stock} = objetoNuevo
    if (!nombre || !descripcion || !codigo || !precio || !stock) {
        res.status(400).json({mensaje: "Datos producto requerido"})
        return
    }
    nuevoProducto = await productos.save(objetoNuevo)
    res.status(200).json({mensaje: "Producto agregado"})
})

router.put("/:id", authie, async (req, res) => {
    const id = req.params.id || 0
    const {nombre, descripcion, codigo, precio, stock} = req.body
    if (!id || !nombre || !descripcion || !codigo || !precio || !stock) {
        res.status(400).json({mensaje: "Datos producto requerido"})
        return
    }
    updateProducto = await productos.updateById(id, {
        nombre, 
        descripcion, 
        codigo, 
        precio, 
        stock
    })
    res.status(200).json({mensaje: "Producto actualizado"})
})

router.delete("/:id", authie, async (req, res) => {
    const id = req.params.id || 0
    if (!id) {
        res.status(400).json({mensaje: "ID no encontrado"})
        return
    }
    deleteProducto = await productos.deleteById(id)
    res.status(200).json({mensaje: "Producto eliminado"})
})

module.exports = router

