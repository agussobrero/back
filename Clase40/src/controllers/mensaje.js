const MensajeService = require("../services/mensaje")

function getAllMessages (req, res) {
    const _result = MensajeService.readAll()
    res.json(_result)
}

function addNewMessage (req, res) {
    const {id, email, message} = req.body
    if(!id || !email || !message) {
        res.status(400).json({mensaje: "campos requeridos"})
        return
    }
    const _result = MensajeService.save({id, email, message})
    res.json(_result)
}

function getMessageById (req, res) {
    const id = parseInt(req.params.id)
    if(!id) {
        res.status(400).json({mensaje: "campo requerido"})
        return
    }
    const _result = MensajeService.getById(id)
    if(!_result) {
        res.status(404).json({mensaje: "producto no encontrado"})
    }
    res.json(_result)
}

function updateMessageById (req, res) {
    const id = parseInt(req.params.id)
    const {email, message} = req.body
    if(!id) {
        res.status(400).json({mensaje: "campo requerido"})
        return
    }
    const _result = MensajeService.updateById(id, {id, email, message})
    res.json(_result)
}

function deleteById (req, res) {
    const id = parseInt(req.params.id)
    if(!id) {
        res.status(400).json({mensaje: "campo requerido"})
        return
    }
    const _result = MensajeService.deleteById(id)
    res.json(_result)
}

function showMensajeView (req, res) {
    const mensajes = MensajeService.readAll()
    res.render("mensajes", {mensajes})
}

module.exports = {
    getAllMessages,
    addNewMessage,
    getMessageById,
    updateMessageById,
    deleteById,
    showMensajeView
}