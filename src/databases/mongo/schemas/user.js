const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    nombre: {type: String, required: true},
    direccion: {type: String, required: true},
    edad: {type: String, required: true},
    telefono: {type: String, required: true},
    avatar: {type: String, required: true},
}, {timestamps: true})

const User = mongoose.model("User", userSchema)

module.exports = User