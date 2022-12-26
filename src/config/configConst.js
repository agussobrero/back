const dotenv = require("dotenv")
dotenv.config()

const args = require("yargs")(process.argv.slice(2))
        .alias({
            p: "port",
            m: "mode"
        })
        .default({
            port: 8080,
            mode: "fork"
        })
        .argv

const DATABASE_CLUSTER= process.env.DATABASE_CLUSTER
const DATABASE_USER = process.env.DATABASE_USER
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
const DATABASE_NAME = process.env.DATABASE_NAME
const PORT = process.env.port || args.port
const MODE = args.mode

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
const TWILIO_PHONE = process.env.TWILIO_PHONE
const TWILIO_PHONE2 = process.env.TWILIO_PHONE2
const MY_PHONE = process.env.MY_PHONE

const KEY_MAIL = process.env.KEY_MAIL
const MY_MAIL = process.env.MY_MAIL


module.exports = {
DATABASE_CLUSTER,
DATABASE_USER,
DATABASE_PASSWORD,
DATABASE_NAME,
PORT,
MODE,
TWILIO_ACCOUNT_SID,
TWILIO_AUTH_TOKEN,
TWILIO_PHONE,
TWILIO_PHONE2,
MY_PHONE,
KEY_MAIL,
MY_MAIL
}