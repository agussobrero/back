const Router = require("koa-router")
const MessageDAO = require("../../src/factory/DAOFactory").getMessageDAO()

const messageRouter = new Router({
    prefix: "/mensajes"
})

messageRouter.get("/", async (ctx)=>{
    const mensajes = await MessageDAO.getAll()
    if(!mensajes) {
        ctx.status=404
    } else {
        ctx.body = mensajes
    }
})

messageRouter.post("/", async (ctx)=>{
    const object = ctx.request.body
    const newMess = await MessageDAO.save(object)
    if(!newMess) {
        ctx.status=404
    } else {
        ctx.body = newMess
    }
})

messageRouter.get("/:id", async (ctx)=>{
    const id = ctx.params.id
    const messId = await MessageDAO.getById(id)
    if(!messId) {
        ctx.status=404
    } else {
        ctx.body = messId   
    }
})

messageRouter.put("/:id", async (ctx)=> {
    const id = ctx.params.id
    const newObject = ctx.request.body
    const upMess = await MessageDAO.updateById(id, newObject)
    if(upMess !== null) {
        ctx.body = upMess   
    } else {
        ctx.status=404
    }
})

messageRouter.delete("/:id", async (ctx)=> {
    const id = ctx.params.id
    const delMess = await MessageDAO.deleteById(id)
    if(delMess) {
        ctx.body = `Mensaje eliminado con el id: ${id}` 
    } else {
        ctx.status=404
    }
})

module.exports = messageRouter