import { helpers } from "../deps.ts"

const productos = [
    {
        id: 24,
        name: "cbdDeno",
        price: 12500
    },
    {
        id: 2,
        name: "thcDeno",
        price: 15500
    }
]

export function getAllProducts(ctx) {
    ctx.response.body = productos
}

export async function addNewProduct(ctx) {
    const body = await ctx.request.body().value
    if(body)
    productos.push(body)
    ctx.response.status = 201
    ctx.response.body = body
}

export async function getById(ctx) {
    let id = helpers.getQuery(ctx, {mergeParams: true}).id
    id = parseInt(id)
    const producto = productos.find(p=> p.id === id)
    ctx.response.body = producto
    if(producto){
        ctx.response.body = producto
    } else {
        ctx.status = 404
    }
}

export async function updateById(ctx) {
    let id = helpers.getQuery(ctx, {mergeParams: true}).id
    id = parseInt(id)
    const body = await ctx.request.body().value
    if(body) {
        const producto = productos.find(p=> p.id === id)
        if(producto) {
            producto.id = body.id,
            producto.name = body.name,
            producto.price = body.price
        }
        ctx.response.status = 201
        ctx.response.body = producto
    }
    ctx.response = 404
}

export async function deleteById(ctx) {
    let id = helpers.getQuery(ctx, {mergeParams: true}).id
    id = parseInt(id)
    const producto = productos.find(p=> p.id === id)
    if(producto) {
        productos.splice(productos.indexOf(producto), 1)
        ctx.status = 201
    }
    ctx.status = 404
}