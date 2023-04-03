const Koa = require("koa")
const app = new Koa()
const PORT_KOA = 8000
const productRouter = require("./routes/koaProducts")
const messageRouter = require("./routes/koaMessages")
const bodyparser = require("koa-bodyparser")
const connection = require("../src/database/connection")
connection()

app.use(bodyparser())
app.use(productRouter.routes())
app.use(messageRouter.routes())

app.use(async ctx => {
    ctx.body = "Koa + Mongo"
})

app.listen(PORT_KOA, ()=> {
    console.log(`conectado al puerto: ${PORT_KOA} con Koa`)
})