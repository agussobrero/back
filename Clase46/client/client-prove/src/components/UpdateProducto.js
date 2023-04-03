import { useState } from "react";
import { updateProduct } from "../api/services";
import { Link } from "react-router-dom";

const UpdateProducto = () => {
    const [_id, set_Id] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")

    const updateP = async (e) => {
        if(!_id) {
            alert("Campo requerido")
        } else {
            e.preventDefault()
            const response = await updateProduct(_id, {name, price})
            console.log(response)
        }
    }

    return (
        <>
            <form>
                <label>Id producto a modificar</label>
                <input
                value={_id}
                onChange={(e)=>set_Id(e.target.value)}
                />

                <label>Nombre</label>
                <input
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />

                <label>Precio</label>
                <input
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                />
            </form>

            <button type="submit" onClick={updateP}>
                Modificar
            </button>
            <Link to={"/productos"}>
            Ver Productos
            </Link>
        </>
    )
}

export default UpdateProducto