const socket = io()

socket.on("connect", ()=> {
    console.log("Conectado al servidor")
})

//Productos
/* const ingresoProducto = document.getElementById("ingresarProducto")

ingresoProducto.addEventListener("submit", (e) => {
    e.preventDefault();
    const productoNuevo = {
        nombre: ingresoProducto.children.nombre.value,
        precio: ingresoProducto.children.precio.value,
        thumbnail: ingresoProducto.children.thumbnail.value,
    }
    socket.emit("productoNuevo", (productoNuevo))
    ingresoProducto.reset()
}) */

/* socket.on("productosRegistrados", (productos) => {
    prodTable(productos).then((html) => {
        document.getElementById("productos").innerHTML = html
    })
}) */

socket.on("testProductos", (testProductos) =>{
    prodTable(testProductos).then((html) => {
        document.getElementById("productosTest").innerHTML = html
    }).then(socket.on("productoNuevo", testProductos))
})

/* socket.on("productoNuevo", await productos.save(testProductos)) */

const prodTable = async (testProductos) => {
    const res = await fetch ("../productos.hbs")
    const view = await res.text()
    const template = Handlebars.compile(view)
    const html = template ({producto: testProductos})
    return html
}

//Mensajes

const email = document.getElementById("email")
const mensaje = document.getElementById("mensaje")
const enviarMensaje = document.getElementById("enviarMensaje")

const ingresoMensaje = document.getElementById("ingresarMensaje")

ingresoMensaje.addEventListener("submit", (e) => {
    e.preventDefault();
    const mensaje = {
        autor: {
            email: ingresoMensaje.children.email.value,
            nombre: ingresoMensaje.children.nombre.value,
            apellido: ingresoMensaje.children.apellido.value,
            edad: ingresoMensaje.children.edad.value,
            alias: ingresoMensaje.children.alias.value,
            avatar: ingresoMensaje.children.avatar.value
        },
        mensaje: ingresoMensaje.children.mensaje.value
    }
    socket.emit("mensajeNuevo", mensaje)
    console.log(mensaje)
    ingresoMensaje.reset()
})

socket.on("mensajesRegistrados", (mensaje) => {
    const html = mensajesListHtml(mensaje)
    document.getElementById("mensajes").innerHTML = html
})

function mensajesListHtml (mensajes) {
    return mensajes.map((mensaje) => {
        return (
            `
            <div>
                <b>Usuario: ${mensaje.email}</b>
                <i>Mensaje: ${mensaje.mensaje}</i>
            </div>
            `
        )
    }).join(" ");
}


