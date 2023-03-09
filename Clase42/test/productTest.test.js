const expect = require("chai").expect
const supertest = require("supertest")
const agent = supertest.agent("http://localhost:3000")

describe(`Products CRUD test`, () => {
    let testProductId
    it(`should add product`, async () => {
        try {
            const testProduct = {
                name: "thcCandy",
                price: 22500
            }
            const response = await agent.post(`/productos`).send(testProduct)
            testProductId = response.body._id
            const product = response.body
            expect(response.status).to.equal(200)
            expect(product).to.include.keys("name", "price")
            expect(product).to.contain(testProduct)
        } catch (error) {
            console.log(error)
        }
    })

    it(`should edit product`, async () => {
        try {
            const productUpdate = {
                name: "thcCandyStrong",
                price: 23000
            }
            const response = await agent.put(`/productos/${testProductId}`).send(productUpdate)
            const product = response.body
            expect(response.status).to.equal(200)
        } catch (error) {
            console.log(error)
        }
    })

    it(`should delete product`, async () => {
        try {
            const response = await agent.delete(`/productos/${testProductId}`)
            const product = response.body
            expect(response.status).to.equal(200)
        } catch (error) {
            console.log(error)
        }
    })
})