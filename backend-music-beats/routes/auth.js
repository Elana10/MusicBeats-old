const express = require('express');
const axios = require('axios');
const User = require('../models/users');
const createJWT = require('../helper/jwtoken');

router = new express.Router();

router.post('/login', async function (req, res, next){
    try{
        const {username, password} = req.body;
        const user = await User.authenticate(username, password)
        const token = createJWT(user);
        return res.json({token, user})        
    } catch (e){
        return next(e);
    }
})

router.post('/signup', async function (req, res, next){
    try{
        const user = await User.register(req.body);
        const token = createJWT(user);
        return res.status(201).json({token, user})
    } catch (e){
        return next(e);
    }
})

module.exports = router;