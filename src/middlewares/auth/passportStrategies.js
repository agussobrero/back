const User = require("../../databases/mongo/schemas/user")
const { hashPassword, comparePassword } = require("../../utils/bcrypt")

const loginStrategy = (async (username, password, done)=>{
    try {
        const user = await User.findOne({username})
        if(!user || !comparePassword(user, password)) {
            return done(null, false, {mensaje: "error en los datos"})
        } else {
            return done(null, user)
        }
    } catch (err) {
        done(err)
    }
})

const signUpStrategy = (async (req, username, password, done)=>{
    const user = await User.findOne({username})
    if (user) {
        return done(null, false, {mensaje: "Usuario ya Registrado"})
    }
    const hashedPassword = hashPassword(password)
    const newUser = new User({
        username,
        password: hashedPassword,
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        edad: req.body.edad,
        telefono: req.body.telefono,
        avatar: req.body.avatar
    })
    await newUser.save()
    return done(null, newUser)
})

module.exports = {
    loginStrategy,
    signUpStrategy
}