import { useState } from "react";
import { deleteProduct } from "../api/services";
import { Link } from "react-router-dom";

const DeleteProduct = () => {
    const [_id, set_Id] = useState("")

    const delP = async (e) => {
        if(!_id) {
            alert("Campos requeridos")
            return
        } else {
            e.preventDefault()
            const response = await deleteProduct(_id)
            return response
        }
    }

    return (
        <>
            <form>
                <label>Introduzca el ID del Producto a borrar</label>
                <input
                value={_id}
                onChange={(e)=>set_Id(e.target.value)}
                type="text"
                />
            </form>

            <button type="submit" onClick={delP}>
                Eliminar
            </button>
            <Link to={"/productos"}>
            Ver Productos
            </Link>
        </>
    )
}

export default DeleteProduct