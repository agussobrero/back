const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const { loginStrategy, signUpStrategy } = require("./passportStrategies")
const { Types } = require("mongoose")
const User = require("../../databases/mongo/schemas/user")

passport.use("login", new LocalStrategy(loginStrategy))
passport.use("signup", new LocalStrategy({passReqToCallback: true}, signUpStrategy))

passport.serializeUser((user, done)=>{
    done(null, user._id)
})

passport.deserializeUser(async (id, done)=>{
    id = Types.ObjectId(id)
    const user = await User.findOne(id)
    done(null, user)
})

const passportSignup = passport.authenticate("signup",
{failureRedirect: "/auth/failsignup"})

const passportLogin = passport.authenticate("login",
{failureRedirect: "/auth/faillogin"})

module.exports = {
    passport,
    passportLogin,
    passportSignup
}