import { useQuery, gql } from '@apollo/client';

export const listProd = gql`
    query getProducts{getProducts{id, name, price}}
    `            
const ListaProductosQlApollo = () => {

    const { loading, error, data } = useQuery(listProd);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return(
        <div>
            <h2>ProductosQlApollo</h2>
            { data.getProducts.map(producto =>
                <div key={producto.id}>
                    <p>Nombre: {producto.name}</p>
                    <p>Precio: ${producto.price}</p>
                    <p>ID: {producto.id}</p>
                </div>
            )}
        </div>
    )
}

export default ListaProductosQlApollo
