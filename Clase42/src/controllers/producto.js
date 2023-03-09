const factory = require("../factory/DAOFactory")
const ProductDAO = factory.getProductDAO()

async function getAllProducts (req, res) {
    const _result = await ProductDAO.getAll()
    res.json(_result)
}

async function addNewProduct (req, res) {
    const {id, name, price} = req.body
    if(/* !id ||  */!name || !price) {
        res.status(400).json({mensaje: "campos requeridos"})
        return
    }
    const _result = await ProductDAO.save({/* id,  */name, price})
    res.json(_result)
}

async function getProductById (req, res) {
    const id = req.params.id
    if(!id) {
        res.status(400).json({mensaje: "campo requerido"})
        return
    }
    const _result = await ProductDAO.getById(id)
    if(!_result) {
        return res.status(404).json({mensaje: "producto no encontrado"})
    }
    return res.json(_result)
}

async function updateProductById (req, res) {
    const id = req.params.id
    const {name, price} = req.body
    if(!id) {
        res.status(400).json({mensaje: "campo requerido"})
        return
    }
    const _result = await ProductDAO.updateById(id, {id, name, price})
    return res.json(_result)
}

async function deleteById (req, res) {
    const id = req.params.id
    if(!id) {
        res.status(400).json({mensaje: "campo requerido"})
        return
    }
    const _result = await ProductDAO.deleteById(id)
    return res.json(_result)
}

async function showProdutoView (req, res) {
    const productos = await ProductDAO.getAll()
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