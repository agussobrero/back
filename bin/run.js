const cluster = require("cluster")
const numCPUs = require("os").cpus().length
const app = require("../app")
const { MODE, PORT} = require("../src/config/configConst")

app()

if (MODE === "cluster" && cluster.isMaster) {
    for (let i = 0; i < numCPUs.length; i++) {
        cluster.fork();
    }
    cluster.on("exit", (worker) => {
        console.log(`worker caido nº: ${cluster.process.id}`)
        cluster.fork()
    })
} else {
    app.listen(PORT, () => {
    console.log(`Conectado al puerto: ${PORT}`)
})
    app.on("error", error => console.log(error))
}

/* app.listen(PORT, () => {
    console.log(`Conectado al puerto: ${PORT}`)
}) */