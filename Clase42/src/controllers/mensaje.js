const factory = require("../factory/DAOFactory")
const MensajeDAO = factory.getMessageDAO()

async function getAllMessages (req, res) {
    const _result = await MensajeDAO.getAll()
    res.json(_result)
}

async function addNewMessage (req, res) {
    const {id, email, message} = req.body
    if(!id || !email || !message) {
        res.status(400).json({mensaje: "campos requeridos"})
        return
    }
    const _result = await MensajeDAO.save({id, email, message})
    res.json(_result)
}

async function getMessageById (req, res) {
    const id = req.params.id
    if(!id) {
        res.status(400).json({mensaje: "campo requerido"})
        return
    }
    const _result = await MensajeDAO.getById(id)
    if(!_result) {
        res.status(404).json({mensaje: "producto no encontrado"})
    }
    res.json(_result)
    
}

async function updateMessageById (req, res) {
    const id = req.params.id
    const {email, message} = req.body
    if(!id) {
        res.status(400).json({mensaje: "campo requerido"})
        return
    }
    const _result = await MensajeDAO.updateById(id, {id, email, message})
    res.json(_result)
}

async function deleteById (req, res) {
    const id = req.params.id
    if(!id) {
        res.status(400).json({mensaje: "campo requerido"})
        return
    }
    const _result = await MensajeDAO.deleteById(id)
    res.json(_result)
}

async function showMensajeView (req, res) {
    const mensajes = await MensajeDAO.getAll()
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