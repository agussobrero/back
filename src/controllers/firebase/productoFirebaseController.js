const config = require("../../config/config")

class ProductoFirebaseController {
    constructor() {
        this.db = config.firebase.db,
        this.query = this.db.collection("productos")
    }

    getAll = async () => {
        try{
            const querySnapshot = await this.query.get()
            let docs = querySnapshot.docs
            return docs.map((doc)=> (doc.data()))
        } catch (err) {
            console.log(err)
        }
    }

    save = async (producto) => {
        try{
            let docs = this.query.doc()
            producto.timestamp = Date.now()
            const result = await docs.set({id: docs.id, ...producto})
            return result
        } catch (err) {
            console.log(err)
        }
    }

    getById = async (id) => {
        try{
            let doc = this.query.doc(`${id}`)
            let producto = await doc.get()
            return producto.data()
        } catch (err) {
            console.log(err)
        }
    }

    updateById = async (id, productoNuevo ) => {
        try{
            let doc = this.query.doc(`${id}`)
            return await doc.update(productoNuevo)
        } catch (err) {
            console.log(err)
        }
    }

    deleteById = async (id) => {
        try{
            let doc = this.query.doc(`${id}`)
            return await doc.delete()
        } catch (err) {
            console.log(err)
        }
    }

    deleteAll = async () => {
        try{
            const querySnapshot = await this.query.get()
            let docs = querySnapshot.docs
            return docs.map(doc =>{
                return doc.delete()
            })
        } catch (err) {
            console.log(err)
        }
    }
}  

module.exports = ProductoFirebaseController