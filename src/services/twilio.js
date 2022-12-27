const twilio = require("twilio")
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE, TWILIO_PHONE2, MY_PHONE, KEY_MAIL, MY_MAIL } = require("../config/configConst")
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
const logger = require("../../loggers/loggerConfig")
const nodemailer = require("nodemailer")

ingresoSms = async (name) => {
    try {
        const info = await client.messages.create(
            {
                from: TWILIO_PHONE,
                to: MY_PHONE,
                body: `Acabas de ingresar a tu cuenta ${name}`
            }
            )
            .then((res) => logger.log("info", `Mensaje Enviado`))
            .catch(err => logger.log("error", `Ocurrió un error con Nodemailer: ${err}`))
    } catch (err) {
        logger.log("error", `Ocurrió un error con Twilio y SMS: ${err}`)
    }
}

ingresoWhatsapp = async (name) => {
    try {
        const info = await client.messages.create(
            {
                from: `whatsapp:${TWILIO_PHONE2}`,
                to: `whatsapp:${MY_PHONE}`,
                body: `Acabas de ingresar a tu cuenta ${name}`
            }
            )
            .then((res) => logger.log("info", `Mensaje Enviado`))
            .catch(err => logger.log("error", `Ocurrió un error con Nodemailer: ${err}`))
    } catch (err) {
        logger.log("error", `Ocurrió un error con Twilio y Whatsapp: ${err}`)
    }
}

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: MY_MAIL,
        pass: KEY_MAIL
    }
})

const recipient = "jacynthe.hermann@ethereal.email"

const mailOptions = {
    to: recipient,
    from: MY_MAIL,
    subject: "Prueba desde Node",
    html: `<h1>Recuerda visitarnos Pronto2!!!</h1>`
}

publiMail = async (name) => {
    try {
        const info = await transport.sendMail(mailOptions)
        .then((res) => logger.log("info", `Mail Enviado`))
        .catch(err => logger.log("error", `Ocurrió un error con Nodemailer: ${err}`))
    } catch (err) {
        logger.log("error", `Ocurrió un error con Nodemailer: ${err}`)
    }
}


module.exports = {
    ingresoSms,
    publiMail,
    ingresoWhatsapp
}