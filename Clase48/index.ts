import { Application} from "./deps.ts"
import productosRouter from "./Routes/productos.ts"
import { CORS } from "./deps.ts"
import { PORT } from "./config/config.ts"

const app = new Application()

app.use(CORS())
app.use(productosRouter.routes())

await app.listen({port: PORT})
