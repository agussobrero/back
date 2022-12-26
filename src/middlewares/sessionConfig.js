const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_CLUSTER, DATABASE_NAME, DATABASE_SECRET} = require ("../config/configConst")
const MongoStore = require("connect-mongo")

const sessionConfig = {
    store: new MongoStore({
        mongoUrl: `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_CLUSTER}/${DATABASE_NAME}?retryWrites=true&w=majority`,
        ttl: 60 * 10
    }),
    secret: "confi123" || DATABASE_SECRET,
    resave: true,
    saveUninitialized: true
}

module.exports = { sessionConfig }