import { DATABASE_TYPE } from "../config/config";
import { ProductoDAOMongoImpl } from "../dao/producto.dao.mongo";

export class ProductoFactory {
    private productoDAO
    getDAO() {
        switch (DATABASE_TYPE) {
            case "mongo":
                this.productoDAO = new ProductoDAOMongoImpl()
                break
            case "firebase":
                break
            case "memoria":
                break
        }
        return this.productoDAO
    }
}

