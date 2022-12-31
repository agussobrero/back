const express = require("express")
const MensajesRouter = express.Router()
const {
    getAllMessages,
    addNewMessage,
    getMessageById,
    updateMessageById,
    deleteById
} = require("../controllers/mensaje")

MensajesRouter.get("/", getAllMessages)
MensajesRouter.post("/", addNewMessage)
MensajesRouter.get("/:id", getMessageById)
MensajesRouter.put("/:id", updateMessageById)
MensajesRouter.delete("/:id", deleteById)

module.exports = MensajesRouter