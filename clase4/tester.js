const Container = require("./container")
const container = new Container ("products.json")

async function main() {

    const prod1 = {
        "name": "cbdCream",
        "price": 4000,
    }

    const prod2 = {
        "name": "thcCream",
        "price": 4300,
    }

    await container.save(prod1).then(
        id=> console.log(`Se guardó con el id: ${id}`)
    )

    await container.getAll().then(
        cont=> cont.map((obj)=>{
            console.log(obj)
        })
    ).then(
        cont=> console.log(`Cuenta con: ${cont.length} productos`)
    )

    await container.getById(2).then(
        object=> object.length > 0 ? console.log(`Corresponde al producto: ${object[0].name}`) : console.log(`No se encontró dicho producto`)
    )

    await container.deleteById(3).then(
        ()=> console.log(`Se eliminó el producto`)
    )

    await container.getAll().then(
        objects=> console.log(`Cuenta con: ${objects.length} productos`)
    )

    await container.deleteAll().then(
        ()=> console.log(`Se eliminó todos los productos`)
    )
    
}

main()