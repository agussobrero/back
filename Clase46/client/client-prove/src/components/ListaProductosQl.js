import { useEffect, useState } from "react";
import axios from "axios";

const ListaProductosQl = () => {

    const [productos, setProductos] = useState([])

    useEffect(() => {
        const sync = async () => {
        const data = JSON.stringify({
            query: `query{
            getProducts{id, name, price}
            }`,
        variables: {}
    });
        const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/graphql',
        headers: { 
        'Content-Type': 'application/json'
        },
        data : data
    };
    const resp = await axios(config)
    setProductos(resp.data.data.getProducts)
    }
    sync()
})

    return(
        <div>
            <h2>ProductosQl</h2>
            { productos.map(producto =>
                <div key={producto.id}>
                    <p>Nombre: {producto.name}</p>
                    <p>Precio: ${producto.price}</p>
                    <p>ID: {producto.id}</p>
                </div>
            )}
        </div>
    )
}

export default ListaProductosQl


