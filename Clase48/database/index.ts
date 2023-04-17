import { MongoClient } from "../deps.ts"
import { Producto } from "./schemas/index.ts"
import { DATABASE_PASSWORD, DATABASE_USER, DATABASE_NAME, DATABASE_CLUSTER } from "../config/config.ts"

const client = new MongoClient()

try {
    await client.connect(
        `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_CLUSTER}/${DATABASE_NAME}?authMechanism=SCRAM-SHA-1`,
        console.log('conectado con Deno')
    )
} catch (error) {
    console.log(error)
}

export const database = client.database("clase48")
export const productoCollection = database.collection<Producto>("productos")
