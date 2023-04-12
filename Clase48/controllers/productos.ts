import { helpers } from "../deps.ts"
import { productoCollection } from "../database/index.ts"
import { Producto } from "../database/schemas/index.ts"

export async function getAllProducts(ctx) {
    const resp = await productoCollection.find({}).toArray()
    ctx.response.status = 200
    ctx.response.body = resp
}

export async function addNewProduct(ctx) {
    const body = await ctx.request.body().value
    if(body && body?.id && body?.name && body?.price) {
        const producto: Producto = {
            _id: body?._id,
            id: body.id,
            name: body.name,
            price: body.price
        }
        const resp = await productoCollection.insertOne(producto)
        ctx.response.status = 201
        ctx.response.body = producto
    } else {
        ctx.status = 404
    }
}

export async function getById(ctx) {
    let id = helpers.getQuery(ctx, {mergeParams: true}).id
    id = parseInt(id)
    const producto: Producto = await productoCollection.findOne({id})
    if(producto){
        ctx.response.status = 200
        ctx.response.body = producto
    } else {
        ctx.status = 404
    }
}

export async function updateById(ctx) {
    let id = helpers.getQuery(ctx, {mergeParams: true}).id
    const body = await ctx.request.body().value
    id = parseInt(id)
    if (body && body?.name && body?.price) {
        await productoCollection.updateOne({id}, {
            $set: {
                name: body.name,
                price: body.price
            }
        })
        const producto: Producto = await productoCollection.findOne({id});
        ctx.response.body = producto
        ctx.response.status = 200
    } else {
        ctx.status = 404
    }
}

export async function deleteById(ctx) {
    let id = helpers.getQuery(ctx, {mergeParams: true}).id
    id = parseInt(id)
    await productoCollection.deleteOne({id})
    ctx.response.status = 200
    ctx.response.body = `Producto eliminado con el id: ${id}`
}