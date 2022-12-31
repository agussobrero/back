const fs = require("fs");
const encoding = "utf-8";

class ContenedorArchivo{
    constructor (path) {
        this.filePath = path
        this.createFileIfNoExist()
        const data = fs.readFileSync(this.filePath, encoding)
        this.contenedor = JSON.parse(data)
    }

    createFileIfNoExist() {
        if(!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, "[]")
        }
    }

    _saveAll(data) {
        const stringData = JSON.stringify(data, null, 2)
        fs.writeFileSync(this.filePath, stringData, encoding)
    }
    
    save(object) {
        if (!object.id) {
            const lastId = this.contenedor.reduce((max, obj) => { return obj.id > max ? obj.id : max }, 0)
            const newId = lastId + 1;
            object.id = newId;
        }
        this.contenedor.push(object);
        this._saveAll(this.contenedor);
        return object.id;
    }

    getById(id) {
        return this.contenedor.filter(obj => obj.id === id)
    }

    getAll() {
        return this.contenedor
    }

    deleteById(id) {
        const filtrado = this.contenedor.filter(obj=> obj.id !== id)
        this.contenedor = filtrado
        this._saveAll(this.contenedor)
    }

    deleteAll() {
        this.contenedor = []
        this._saveAll(this.contenedor)
    }

    getRandom = async()=> {
        const _result = this.contenedor.then((products)=> products[Math.floor(Math.random() * products.length)])
        return _result
    }

    updateById = async (id, object) =>{
        const index = await this.contenedor.findIndex(el => el.id === id)
        this.contenedor[index] = object
        this._saveAll(this.contenedor)
        return this.contenedor[index]
    }
} 

module.exports = ContenedorArchivo

