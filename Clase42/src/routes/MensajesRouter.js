const express = require("express")
const MensajesRouter = express.Router()
const {
    getAllMessages,
    addNewMessage,
    getMessageById,
    updateMessageById,
    deleteById,
    showMensajeView 
} = require("../controllers/mensaje")
const isAuth = require("../middlewares/isAuth")

MensajesRouter.get("/", getAllMessages)
MensajesRouter.post("/", /* isAuth, */ addNewMessage)
MensajesRouter.get("/:id", getMessageById)
MensajesRouter.put("/:id", /* isAuth, */ updateMessageById)
MensajesRouter.delete("/:id", /* isAuth, */ deleteById)
MensajesRouter.get("/view/mensajes", showMensajeView)

module.exports = MensajesRouter