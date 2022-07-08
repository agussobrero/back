
class Contenedor {
    constructor (name, price, id ) {
        this.name = name,
        this.price = price,
        this.id = id
    }
} 



const fs = require("fs");

const data = fs.readFileSync("./products.json", "utf-8");

const products = JSON.parse(data);

const newProduct = (name, price, id)=>{
    products.push(
        {
            "name": name,
            "precio": price,
            "id": id
        }
    )
}

newProduct("thcCream", 4200, 4)

fs.writeFileSync("./products.json", JSON.stringify(products, null, 2))

const index = 3;

const indexFound = products.filter(prod => prod.id === index)

/* const getAll = products.map((product)=> {
    product.id =!0;
    return {
        product
    }
}) */
//la comento porque sino me deja todos los id=true, sin invocar la funcion, no entiendo


const index2 = 2;

const deleteId = products.filter(product=> product.id !== index2)


const empty = products => products.length = 0;

empty(products)





//Comentarios y dudas
//lo de clase contenedor que reciba el nombre del archivo
//en el metodo save, lo del id del ultimo agregado, para hacerlo dinamica