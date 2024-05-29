const jwt = require('jsonwebtoken')
const express = require('express');
const getToken = require('../helper/token')


router = new express.Router();

router.get('/', async function (req, res, next) {

const {TEAM_ID, KID, APPLE_PRIVATE_KEY } = require('../secret');
const expiration = 72000;
const currentTime = Math.floor(Date.now() /1000);
const expirationTime = currentTime + expiration;

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
    exp : expirationTime
}


const newToken = getToken();

return res.json({newToken});

})

module.exports = router;

