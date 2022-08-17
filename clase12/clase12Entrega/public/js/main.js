const socket = io()

socket.on("connect", ()=> {
    console.log("conectado al servidor")
})

socket.on("UPDATE_PRODUCTS" , (producto, productos) => {
    document.getElementById("productos").innerHTML = "";
        for (let producto of productos) {
            appendProducto(producto)
        }
})

socket.on(events.NEW_PRODUCT, (producto) =>{
    appendProducto(producto)
})

function appendProducto(producto) {
    document.getElementsById("productos").html +=
    `
    <div>
        <p>${producto.name} - ${producto.price}</p>
    </div>
    `
}

function enviarProducto() {
    const name = document.getElementById("name").value
    const price = document.getElementById("price").value

    socket.emit(events.POST_UPDATE, {name, price})
}



