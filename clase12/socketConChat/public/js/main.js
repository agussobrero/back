//lado del cliente
const socket = io()

socket.on("connect", ()=>{
    console.log("Conectado al servidor")
})

socket.on("UPDATE_MESSAGES", (msg, allMessages) =>{
    document.getElementById("posts").innerHTML = "";
    /* for (let msg of allMessages) {
        appendMessage(msg)
    } */
    allMessages
        .sort((a,b) => a.date - b.date)
        .forEach(msg => {
            appendMessage(msg)
        });
})

socket.on("NEW_MESSAGE", (msg) => {
    appendMessage(msg)
})

function appendMessage(msg) {
    document.getElementById("posts").innerHTML += 
    `
    <div class="post ui card">
      <div class="content">
        <b>${msg.nombre} (${msg.socket_id}):</b> ${msg.mensaje}
        <hr/>
        <button onclick="likeMessage(${msg.id})">
          <i class="heart icon"></i> (${msg.likes})
        </button>
      </div>
    </div>
  `;
}

function enviarMensaje() {
    const nombre = document.getElementById("nombre").value
    const mensaje = document.getElementById("mensaje").value

    socket.emit("POST_MESSAGE", {nombre, mensaje})
}

function likeMessage(msgId) {
    socket.emit("LIKE_MESSAGE", msgId)
}




//Dejo aca lo de la entrega
/* const prodTable = async (producto) => {
    const res = await fetch ("./views/productos.hbs")
    const view = await res.text()
    const template = Handlebars.compile(view)
    const html = template ({producto: producto})
    return html
}
socket.on(events.UPDATE_PRODUCTS, (productos) => {
    prodTable(productos).then((html) => {
        document.getElementById("productos").innerHTML = html
    })
    console.log(productos)
})

const ingresoProducto = document.querySelector("#ingresarProducto")

ingresoProducto.addEventListener("submit", (e) => {
    e.preventDefault()
    const producto = {
        name: ingresoProducto.children.name.value,
        price: ingresoProducto.children.price.value,
    }
    socket.emit(events.POST_PRODUCT, producto)
    ingresoProducto.reset()
}) */