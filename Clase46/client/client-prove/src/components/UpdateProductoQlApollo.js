import { useMutation, gql } from '@apollo/client';
import { useState } from "react";
import { Link } from "react-router-dom";
import { listProd } from './ListaProductosQlApollo';

const UpProd = gql`
mutation upProd ($id: ID!, $name: String!, $price: String!){
    updateProduct(
        id: $id
        input:{
            name: $name
            price: $price
    })
    {name, price}
}
`

const UpdateProductoQlApollo = () => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [id, setId] = useState("")

    const [updateProduct, {loading, error, data}] = useMutation(UpProd, {
        refetchQueries: [ { query: listProd}]
    })

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
    console.log(data)

    const addP = async (e) => {
            e.preventDefault()
            await updateProduct({
                variables:  { id, name, price }
            })
            setName("")
            setPrice("")
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
                <label>Nombre</label>
                <input
                value={name}
                onChange={(e)=>setName(e.target.value)}
                type="text"
                />
                <label>Precio</label>
                <input
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                type="text"
                />

                <button type="submit">
                Modificar
                </button>
                <Link to={"/listaProductosQlApollo"}>
                Ver Productos
                </Link>
            </form>
        </>
    )
}

export default UpdateProductoQlApollo