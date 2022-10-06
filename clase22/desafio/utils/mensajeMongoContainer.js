
class MensajeMongoContainer {
    constructor(Schema) {
        this.Schema = Schema
    }

    getAll = async () => {
        try {
            return await this.Schema.find()
        } catch (error) {
            console.log(err)
        }
    }

    save = async (mensaje) => {
        try {
            return await new this.Schema(mensaje).save()
        } catch (error) {
            console.log(err)
        }
    }
}

module.exports = MensajeMongoContainer