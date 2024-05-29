const jwt = require("jsonwebtoken");
const { SECRET_JWT_KEY } = require('../config');


function createJWT(user){
    let payload = {
        username : user.username,
        id : user.id
    }

    return jwt.sign(payload, SECRET_JWT_KEY)

}

module.exports = createJWT