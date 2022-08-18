const socket = io()

socket.on("connect", ()=> {
    console.log("Conectado al servidor")
})

socket.on("productoNuevo", (producto) => {
    console.log(producto)
})
