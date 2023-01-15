const socket = io()

socket.on("connect", ()=> {
    console.log("Conectado al servidor")
})

//Productos
const ingresoProducto = document.getElementById("ingresarProducto")

ingresoProducto.addEventListener("submit", (e) => {
    e.preventDefault();
    const productoNuevo = {
        name: ingresoProducto.children.name.value,
        price: ingresoProducto.children.price.value,
    }
    socket.emit("productoNuevo", (productoNuevo))
    ingresoProducto.reset()
})

socket.on("productosRegistrados", (productos) => {
    prodTable(productos).then((html) => {
        document.getElementById("productos").innerHTML = html
    })
})

const prodTable = async (producto) => {
    const res = await fetch ("../productos.hbs")
    const view = await res.text()
    const template = Handlebars.compile(view)
    const html = template ({producto: producto})
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
        email: ingresoMensaje.children.email.value,
        /* fecha: Date.now().toLocaleString(), */
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

