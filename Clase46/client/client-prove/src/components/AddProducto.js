import { useState } from "react";
import { Link } from "react-router-dom";
import { addProduct } from "../api/services";

const AddProduct = () => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [_id, set_Id] = useState("")

    const addP = async (e) => {
        if(!name || !price) {
            alert("Campos requeridos")
            return
        } else {
            e.preventDefault()
            const response = await addProduct({name, price, _id})
            return response
        }
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
                value={_id}
                onChange={(e)=>set_Id(e.target.value)}
                type="text"
                />

                <button type="submit">
                Agregar
                </button>
                <Link to={"/productos"}>
                Ver Productos
                </Link>
            </form>
        </>
    )
}

export default AddProduct