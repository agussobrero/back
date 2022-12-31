const express = require("express")
const ProductosRouter = express.Router()
const {
    getAllProducts,
    addNewProduct,
    getProductById,
    updateProductById,
    deleteById
} = require("../controllers/producto")

ProductosRouter.get("/", getAllProducts)
ProductosRouter.post("/", addNewProduct)
ProductosRouter.get("/:id", getProductById)
ProductosRouter.put("/:id", updateProductById)
ProductosRouter.delete("/:id", deleteById)

module.exports = ProductosRouter