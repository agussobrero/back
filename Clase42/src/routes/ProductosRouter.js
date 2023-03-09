const express = require("express")
const ProductosRouter = express.Router()
const {
    getAllProducts,
    addNewProduct,
    getProductById,
    updateProductById,
    deleteById,
    showProdutoView
} = require("../controllers/producto")  
const isAuth = require("../middlewares/isAuth")

ProductosRouter.get("/", getAllProducts)
ProductosRouter.post("/"/* , isAuth */ ,addNewProduct)
ProductosRouter.get("/:id", getProductById)
ProductosRouter.put("/:id"/* , isAuth */ ,updateProductById)
ProductosRouter.delete("/:id"/* , isAuth */ ,deleteById)
ProductosRouter.get("/view/productos", showProdutoView)

module.exports = ProductosRouter