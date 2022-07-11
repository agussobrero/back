const fs = require("fs");

module.exports = class Container {
    constructor (filename) {
        this.filename = filename
    }

    save = async (object)=> {
        try{
            const objects = await this.getAll()
            object.id = objects.reduce((max, obj) => { return obj.id > max ? obj.id : max }, 0) + 1
            objects.push(object)
            await fs.promises.writeFile(this.filename, JSON.stringify(objects, null, 2))
            return object.id
        }
        catch(err) {
            console.log(err)
        }
    }

    getById = async (id)=> {
        try{
            const objects = await this.getAll()
            const object = objects.filter(obj => obj.id === id)
            return object
        }
        catch(err) {
            console.log(err)
        }
    }

    getAll = async ()=> {
        try{
            const objects = await fs.promises.readFile(this.filename, "utf-8");
            const cont = await JSON.parse(objects)
            if(objects) {
                return cont
            }
            else {
                return []
            }
        }
        catch(err) {
            console.log(err)
        }
    }
    deleteById = async (id)=> {
        try{
            const objects = await this.getAll().then(objects=> {
                return objects.filter(obj=> obj.id !== id)
            }
            )
            await fs.promises.writeFile(this.filename, JSON.stringify(objects, null, 2))
        }
        catch(err) {
            console.log(err)
        }
    }
    deleteAll = async()=> {
        try{
            await fs.promises.writeFile(this.filename, "[]")
        }
        catch(err) {
            console.log(err)
        }
    }
} 

