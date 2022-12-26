const User = require("../databases/mongo/schemas/user")

const verifyUsername = async (username) => {
    return User.findOne({username})
}

module.exports = verifyUsername