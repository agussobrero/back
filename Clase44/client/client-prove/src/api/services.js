import client from ".";

export async function getProducts () {
    const { data } = await client.get("/productos")
    return data
}

export async function addProduct(object) {
    const { data } = await client.post('/productos', object)
    return data
}

export async function getProductById (id) {
    const { data } = await client.get(`/productos/${id}`)
    return data
}

export async function updateProduct (id, object) {
    const { data } = await client.put(`/productos/${id}`, object)
    return data
}

export async function deleteProduct (id) {
    const { data } = await client.delete(`/productos/${id}`)
    return data
}

export async function getProductsQl () {
    const { data } = await client.get("/graphql")
    return data
}

export async function addProductQl (object) {
    const { data } = await client.post("/graphql", object)
    return data
}

export async function getProductByIdQl (id, object) {
    const { data } = await client.get(`/graphql/${id}`, object)
    return data
}

export async function updateProductQl (id, object) {
    const { data } = await client.put(`/graphql/${id}`, object)
    return data
}

export async function deleteProductQl (id) {
    const { data } = await client.delete(`/graphql/${id}`)
    return data
}


