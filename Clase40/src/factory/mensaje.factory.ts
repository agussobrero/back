/* import { DATABASE_TYPE } from "../config/config";
import { MensajeDAOMongoImpl } from "../dao/mensaje.dao.mongo";

export class MensajeFactory {
    private mensajeDAO
    getDAO() {
        switch (DATABASE_TYPE) {
            case "mongo":
                this.mensajeDAO = new MensajeDAOMongoImpl()
                break
            case "firebase":
                break
            case "memoria":
                break
        }
        return this.mensajeDAO
    }
} */