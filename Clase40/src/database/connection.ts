const mongoose = require("mongoose");

export async function connection() {
  // mongodb://<user>:<password>@localhost:port/db
/*   const URIString = "mongodb://localhost:27017/colegio" */
    const URIString="mongodb+srv://agussobrero:xpZFIMrxekWrDNMA@cluster0.7znzdl8.mongodb.net/clase40ts?retryWrites=true&w=majority"
    await mongoose.connect(URIString);
    console.log('conectado')
}

