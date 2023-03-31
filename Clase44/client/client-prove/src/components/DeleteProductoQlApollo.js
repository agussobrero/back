import { useMutation, gql } from '@apollo/client';
import { useState } from "react";
import { Link } from "react-router-dom";
import { listProd } from './ListaProductosQlApollo';

const DelProd = gql`
    mutation delProd ($id: ID!){
    deleteProduct(
        id: $id
    )
    {name, price}
}
`

const DeleteProductoQlApollo = () => {
    const [id, setId] = useState("")

    const [deleteProduct, {loading, error, data}] = useMutation(DelProd, {
        refetchQueries: [ { query: listProd}]
    })

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
    console.log(data)

    const addP = async (e) => {
            e.preventDefault()
            await deleteProduct({
                variables:  { id }
            })
            setId("")
    }

    return (
        <>
            <form onSubmit={addP}>
                <label>Id</label>
                <input
                value={id}
                onChange={(e)=>setId(e.target.value)}
                type="text"
                />
                <button type="submit">
                Eliminar
                </button>
                <Link to={"/listaProductosQlApollo"}>
                Ver Productos
                </Link>
            </form>
        </>
    )
}

export default DeleteProductoQlApollo