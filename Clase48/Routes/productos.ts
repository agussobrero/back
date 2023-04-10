import { Router } from "../deps.ts";
import { getAllProducts, addNewProduct, getById, updateById, deleteById } from "../controllers/productos.ts";

const productosRouter = new Router({
    prefix: "/productos"
})
.get("/", getAllProducts)
.post("/", addNewProduct)
.get("/:id", getById)
.put("/:id", updateById)
.delete("/:id", deleteById)

export default productosRouter