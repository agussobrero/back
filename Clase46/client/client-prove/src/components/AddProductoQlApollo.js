import { useMutation, gql } from '@apollo/client';
import { Link } from "react-router-dom";
import { useState } from "react";
import { listProd } from './ListaProductosQlApollo';

const AddProd = gql`
mutation addProd ($name: String!, $price: String!){
    createProduct(input:{
    name: $name
    price: $price
    })
    {
    id,name, price
    }
}`
const AddProductoQlApollo = () => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [id, setId] = useState("")

    const [createProduct,{loading, error, data}] = useMutation(AddProd, {
        refetchQueries: [ { query: listProd}]
    })
    console.log(data)

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    const addP = async (e) => {
            e.preventDefault()
            await createProduct({
                variables: { name, price, id }
            })
            setName("")
            setPrice("")
            setId("")
    }

    return (
        <>
            <form onSubmit={addP}>
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
                <label>Id</label>
                <input
                value={id}
                onChange={(e)=>setId(e.target.value)}
                type="text"
                />

                <button type="submit">
                Agregar
                </button>
                <Link to={"/listaProductosQlApollo"}>
                Ver Productos
                </Link>
            </form>
        </>
    )
}

export default AddProductoQlApollo