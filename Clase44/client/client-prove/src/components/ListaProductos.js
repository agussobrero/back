import { useEffect, useState } from "react";
import { getProducts } from "../api/services";

const ListaProductos = () => {
    const [productos, setProductos] = useState([])

    const requestProducts = async () => {
        const products = await getProducts()
        setProductos(products)
    }

    useEffect( () => {
        requestProducts()
    }, []);

    return(
        <div>
            <h2>Productos</h2>
            { productos.map(producto => 
                <div key={producto._id}>
                <p>Nombre: {producto.name}</p>
                <p>Precio: ${producto.price}</p>
                <p>ID: {producto._id}</p>
            </div>
            )}
        </div>
    )
}

export default ListaProductos


