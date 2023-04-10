import { Application} from "./deps.ts"
import productosRouter from "./Routes/productos.ts"

const app = new Application()

const PORT = 8080

app.use(productosRouter.routes())

await app.listen({port: PORT})
