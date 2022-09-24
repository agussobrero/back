
class ProductoMemoryController {
    constructor () {
        this.elements = []
    }

    save = (element)=> {
        try{
            const elements = this.getAll()
            element.id = elements.reduce((max, obj) => { return obj.id > max ? obj.id : max }, 0) + 1
            const objectNew = {...elements, timestamp: Date.now(), id: element.id}
            element.timestamp = Date.now();
            elements.push(objectNew)
        }
        catch(err) {
            console.log(err)
        }
    }

    getById = (id)=> {
        try{
            const elements = this.getAll()
            const element = elements.find(element => element.id == id)
            return element
        }
        catch(err) {
            console.log(err)
        }
    }

    getAll = ()=> {
        try{
            const elements = [... this.elements];
            if(elements) {
                return elements
            }
            else {
                return []
            }
        }
        catch(err) {
            console.log(err)
        }
    }

    deleteById = (id)=> {
        try{
            const elements = this.getAll().then(objects=> {
                return objects.filter(obj=> obj.id !== id)
            }
            )
        }
        catch(err) {
            console.log(err)
        }
    }

    deleteAll = ()=> {
        try{
            this.elements = []
        }
        catch(err) {
            console.log(err)
        }
    }

    updateById = (id, elementNuevo) =>{
        const elements = this.getAll()
        const element = elements.find(element => element.id == id)
        const index = elements.indexOf(element)
        elements[index] = {...elementNuevo, id: id}
    }
} 


module.exports = ProductoMemoryController

