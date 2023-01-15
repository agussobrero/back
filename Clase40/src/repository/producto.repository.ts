const ProductoFactory = require("../factory/producto.factory")
const ProductoDTO = require("../dto/producto.dto")

export class ProductoRepository {
    private productoDao
    constructor () {
        const productoFactory = ProductoFactory()
        this.productoDao = productoFactory.getDAO()
    }
    getAll(){
        const productos: typeof ProductoDTO = this.productoDao.getAll()
        console.log(productos)
    }
    getById(id: string){
        const producto: typeof ProductoDTO = this.productoDao.getById(id)
    }
    save(producto: typeof ProductoDTO){
        const _result: typeof ProductoDTO = this.productoDao.save(producto)
    }
    update(id: string, producto: typeof ProductoDTO){
        const _result: typeof ProductoDTO = this.productoDao.update(id, producto)
    }
    delete(id: string){
        const _result: typeof ProductoDTO = this.productoDao.delete(id)
    }
}
