const jwt = require('jsonwebtoken')
// const {TEAM_ID, KID, APPLE_PRIVATE_KEY } = require('../secret')

function getToken(){

    const currentTime = Math.floor(Date.now()/1000)
    const duration = 1728000

    const options = {
        algorithm: 'ES256',
        header :{
        alg : "ES256",
        kid : KID
        }
    }
    
    const payload = {
        iss : TEAM_ID,
        iat : currentTime,
        exp : currentTime + duration
    }
    
    const newToken = jwt.sign(payload, APPLE_PRIVATE_KEY, options)

    return newToken;
}

module.exports = getToken;
