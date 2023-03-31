const {buildSchema} = require("graphql")
const ProductDAO = require("../factory/DAOFactory").getProductDAO()

const schema = buildSchema(`
type Product {
    id: ID!
    name: String!
    price: Int!
}

input ProductInput {
    name: String
    price: String
}

type Query {
    getProduct(id: ID!): Product
    getProducts: [Product]
}

type Mutation {
    createProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: ProductInput): Product
    deleteProduct(id: ID!): Product
}
`)

const root = {
    getProducts: async () => {
        return await ProductDAO.getAll()
    },
    getProduct: async ({id}) => {
        const product = await ProductDAO.getById(id)
        if(product === false) {
            throw new Error(`Producto no encontrado`)
        }
        if(product) return product
    },
    createProduct: async ({input}) => {
        const newProduct = await ProductDAO.save(input)
        if(newProduct === false) {
            throw new Error(`Ocurrió un error`)
        }
        if(newProduct) return newProduct
    },
    updateProduct: async ({id, input}) => {
        const updatedProduct = await ProductDAO.updateById(id, input)
        if(updatedProduct === false) {
            throw new Error(`No se pudo actualizar`)
        }
        if(updatedProduct) return updatedProduct
    },
    deleteProduct: async ({id}) => {
        const deletedProduct = await ProductDAO.deleteById(id)
        if(deletedProduct === false) {
            throw new Error(`No se pudo borrar`)
        }
        if(deletedProduct) return deletedProduct
    }
}

module.exports = {
    schema,
    root
}