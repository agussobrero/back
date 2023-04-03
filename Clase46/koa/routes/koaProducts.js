const Router = require("koa-router")
const ProductDAO = require("../../src/factory/DAOFactory").getProductDAO()

const productRouter = new Router({
    prefix: "/productos"
})

productRouter.get("/", async (ctx)=>{
    const productos = await ProductDAO.getAll()
    if(!productos) {
        ctx.status=404
    } else {
        ctx.body = productos
    }
})

productRouter.post("/", async (ctx)=>{
    const object = ctx.request.body
    const newProd = await ProductDAO.save(object)
    if(!newProd) {
        ctx.status=404
    } else {
        ctx.body = newProd
    }
})

productRouter.get("/:id", async (ctx)=>{
    const id = ctx.params.id
    const prodId = await ProductDAO.getById(id)
    if(!prodId) {
        ctx.status=404
    } else {
        ctx.body = prodId   
    }
})

productRouter.put("/:id", async (ctx)=> {
    const id = ctx.params.id
    const newObject = ctx.request.body
    const updProd = await ProductDAO.updateById(id, newObject)
    if(updProd !== null) {
        ctx.body = updProd   
    } else {
        ctx.status=404
    }
})

productRouter.delete("/:id", async (ctx)=> {
    const id = ctx.params.id
    const delProd = await ProductDAO.deleteById(id)
    if(delProd) {
        ctx.body = `Producto eliminado con el id: ${id}` 
    } else {
        ctx.status=404
    }
})

module.exports = productRouter