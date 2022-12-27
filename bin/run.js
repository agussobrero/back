const cluster = require("cluster")
const numCPUs = require("os").cpus().length
const app = require("../app")
const { MODE, PORT} = require("../src/config/configConst")
const { logger } = require("../loggers/loggerConfig")

app()

if (MODE === "cluster" && cluster.isMaster) {
    logger.log("info", `Master iniciado con PID: ${process.pid}`)
    for (let i = 0; i < numCPUs.length; i++) {
        cluster.fork();
    }
    cluster.on("exit", (worker) => {
        logger.log("info", `worker caido nº: ${cluster.process.id}`)
        cluster.fork()
    })
} else {
    app.listen(PORT, () => {
    logger.log("info", `Conectado al puerto: ${PORT}`)
})
    app.on("error", error => console.log(error))
}

/* app.listen(PORT, () => {
    console.log(`Conectado al puerto: ${PORT}`)
}) */