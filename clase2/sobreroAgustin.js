
class Usuario {
    constructor (nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas
    }

    getFullName() {
        console.log(`Nombre: ${this.nombre} y Apellido: ${this.apellido}`)
    }
    
    addMascotas(mascotaNew) {
        this.mascotas.push(mascotaNew)
    }

    countMascotas() {
        console.log(this.mascotas.length)
    }

    addBooks(titulo, autor) {
        this.libros.push(
            {
                titulo: titulo,
                autor: autor
            }
        )
    }

    getBooksName() {
        console.log(this.libros.map((element)=>{
            var rObj = [];
            rObj[element.titulo] = element.titulo;
            return rObj;
        }))
    }
    /* getBooksName2() {
        for(var i=0; i<this.libros.length; i++) {
            return {
                
            }
        }
    } */
}

const usuario1 = new Usuario (
    "Juan",
    "Stark",
    [
        {
            titulo: "el alquimista",
            autor: "Paulo Cohelo",
        },
        {
            titulo: "ficciones",
            autor: "Borges",
        }
    ],
    ["perro", "canario"]
)

const usuario2 = new Usuario (
    "Liza",
    "Bold",
    [
        {
            titulo: "SIDI",
            autor: "Arturo Perez-Reverte",
        },
        {
            titulo: "Hippie",
            autor: "Paulo Cohelo",
        }
    ],
    ["gato", "pato", "loro"]
)

/* usuario1.getFullName();
usuario1.addMascotas("hamster");
usuario1.countMascotas();
console.log(usuario1.mascotas);
usuario1.addBooks("Crimen y Castigo", "Fedor Dotoievsky");
console.log(usuario1.libros); */

/* usuario2.getFullName();
usuario2.addMascotas("pelicano");
usuario2.countMascotas();
console.log(usuario2.mascotas);
usuario2.addBooks("Amores Perros", "Gabriel Garcia Marquez"); */
console.log(usuario2.libros);
usuario2.getBooksName();
