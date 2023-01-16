const ProductoService = require("../services/producto")

async function getAllProducts (req, res) {
    const _result = await ProductoService.readAll()
    res.json(_result)
    console.log(ProductoService)
}

/* async function getAllProducts(req, res) {
    const _result = await ProductoService.readAll();
    res.status(200).json(_result);
} */

async function addNewProduct (req, res) {
    const {id, name, price} = req.body
    if(!id || !name || !price) {
        res.status(400).json({mensaje: "campos requeridos"})
        return
    }
    const _result = await ProductoService.save({id, name, price})
    res.json(_result)
}

async function getProductById (req, res) {
    const id = parseInt(req.params.id)
    if(!id) {
        res.status(400).json({mensaje: "campo requerido"})
        return
    }
    const _result = await ProductoService.getById(id)
    if(!_result) {
        res.status(404).json({mensaje: "producto no encontrado"})
    }
    res.json(_result)
    
}

async function updateProductById (req, res) {
    const id = parseInt(req.params.id)
    const {name, price} = req.body
    if(!id) {
        res.status(400).json({mensaje: "campo requerido"})
        return
    }
    const _result = await ProductoService.updateById(id, {id, name, price})
    res.json(_result)
}

async function deleteById (req, res) {
    const id = parseInt(req.params.id)
    if(!id) {
        res.status(400).json({mensaje: "campo requerido"})
        return
    }
    const _result = await ProductoService.deleteById(id)
    res.json(_result)
}

async function showProdutoView (req, res) {
    const productos = await ProductoService.readAll()
    res.render("productos", {productos})
}

module.exports = {
    getAllProducts,
    addNewProduct,
    getProductById,
    updateProductById,
    deleteById,
    showProdutoView
}