const { Router } = require("express")
const passport = require("passport")
const router = Router()
const { passporSignup, passportLogin } = require("../middlewares/auth/passport") 
const { ingresoSms, publiMail, ingresoWhatsapp } = require("../services/twilio")

router.get("/login", (req, res)=> {
    res.sendFile("login.html", { root: "/Users/AguS/Documents/Code/Coder House/Back/clase36/public/logs"})
})

router.post("/login", passport.authenticate("login", {
    failureRedirect: "/auth/faillogin"
    }),(req, res)=>{
    const name = req.body.username
    req.session.user = name
    res.redirect("/auth/")
    ingresoSms(name)
    ingresoWhatsapp(name)
})

router.get("/faillogin", (req, res)=>{
    res.sendFile("faillogin.html", { root: "/Users/AguS/Documents/Code/Coder House/Back/clase36/public/logs"})
})

router.get("/signup", (req, res)=>{
    res.sendFile("signup.html", { root: "/Users/AguS/Documents/Code/Coder House/Back/clase36/public/logs"})
})

router.post("/signup", /* ingresoSms */ passport.authenticate("signup", {
    failureRedirect: "/auth/failsignup"
    }),(req, res)=>{
    res.redirect("/auth/login")
})  

router.get("/failsignup", (req, res)=>{
    res.sendFile("failsignup.html", { root: "/Users/AguS/Documents/Code/Coder House/Back/clase36/public/logs"})
})

router.get("/", (req, res)=>{ 
    if (req.session.user) {
        if (req.session.visitas) {
            req.session.visitas++, 
            req.session.ultimaConexion = Date.now()
        } else {
            req.session.visitas = 1
        }
        if (req.session.visitas === 1) {
            res.render("index.hbs", {user: req.session.user, visitas: "esta es tu primer visita"}) 
        } else {
            res.render("index.hbs", {user: req.session.user, visitas: req.session.visitas})
        }
    } else {
        res.redirect("/login")
    }
})

router.use((req, res, next)=> {
    const actualConexion = Date.now()
    const tiempoTranscu = actualConexion - req.session.ultimaConexion
    if (tiempoTranscu > 60 * 1000) {
        res.redirect("/login")
    } else {
        next()
    }
})

router.get("/logout", (req, res)=> {
    res.render("logout.hbs", {user: req.session.user}) 
    publiMail()
    req.session.destroy()
})


module.exports = router