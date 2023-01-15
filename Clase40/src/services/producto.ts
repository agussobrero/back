import { ProductoDTO } from "../dto/producto.dto"
import { ProductoRepository } from "../repository/producto.repository"

const Contenedor = require("../containers/contenedorArchivo")
const contenedor = new Contenedor("src/database/producto.json")


class ProductoService {
    static repo: ProductoRepository

    static initRepo () {
        ProductoService.repo = new ProductoRepository()
    }

    static async save(producto: ProductoDTO) {
        ProductoService.initRepo()
        return ProductoService.repo.save(producto)
    }

    static async readAll() {
        ProductoService.initRepo()
        return ProductoService.repo.getAll()
    }

    static async getById(id) {
        ProductoService.initRepo()
        return ProductoService.repo.getById(id)
    }

    static async updateById(id, producto: ProductoDTO) {
        ProductoService.initRepo()
        return ProductoService.repo.update(id, producto)
    }

    static async deleteById(id) {
        ProductoService.initRepo()
        return ProductoService.repo.delete(id)
    }
}

export default ProductoService