
class ProductoMongoContainer {
    constructor(Schema) {
        this.Schema = Schema
    }

    getAll = async ()=> {
        try{
            return await this.Schema.find()
        } catch(err) {
            console.log(err)} 
    }

    save = async (producto)=> {
        try{
            return await new this.Schema(producto).save()
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = ProductoMongoContainer