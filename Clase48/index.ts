import { Application} from "./deps.ts"
import productosRouter from "./Routes/productos.ts"
import { CORS } from "./deps.ts"

const app = new Application()

const PORT = 8080

app.use(CORS())
app.use(productosRouter.routes())

await app.listen({port: PORT})
