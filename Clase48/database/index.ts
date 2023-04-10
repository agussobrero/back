import { MongoClient } from "../deps.ts"
import { Producto } from "./schemas/index.ts"

export const client = new MongoClient()

try {
    await client.connect(
        "mongodb+srv://agussobrero:xpZFIMrxekWrDNMA@cluster0.7znzdl8.mongodb.net/clase46?authMechanism=SCRAM-SHA-1",
        console.log('conectado con Deno')
    )
} catch (error) {
    console.log(error)
}

export const database = client.database("clase46")
export const productoCollection = database.collection<Producto>("productos")
