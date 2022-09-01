const { Router } = require("express")
const router = Router()
const Contenedor = require ("../utils/contenedorMensaje")
const mensajes = new Contenedor("./mensajes.json")

router.get("/", async (req, res) => {
    res.send(await mensajes.getAll())
})

router.post("/", (req, res) => {
    const body = req.body
    console.log(body)
    const mensaje = {
        email: body.email,
        fecha: body.fecha,
        mensaje: body.mensaje
    }
    mensajes.save(mensaje)
    res.send(mensaje)
})

router.put("/:id", (req, res) => {
    const body = req.body
    const id = req.params.id
    const newMensaje = {
        email: body.email,
        fecha: body.fecha,
        mensaje: body.mensaje
    }
    mensajes.updateById(id, newMensaje)
    res.send(newMensaje)
})

router.delete("/:id", (req, res) => {
    id = req.params.id
    mensajes.deleteById(id)
})

module.exports = router