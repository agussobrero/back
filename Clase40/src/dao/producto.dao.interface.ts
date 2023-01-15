import { ProductoDTO } from "../dto/producto.dto"

export interface ProductoDAOInterface {
    getAll()
    getById(id: string)
    save(producto: ProductoDTO)
    update(id: string, producto: ProductoDTO)
    delete(id: string)
}