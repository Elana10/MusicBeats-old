const express = require('express');
const axios = require('axios');
const AppleSongs = require('../models/appleSongs');

router = new express.Router();

router.get('/all', async function(req, res, next){
    let {offset} = req.query;
    const response = await AppleSongs.getAllSongs(offset);
    const resultsApple = response.map(data => (JSON.parse(data.jsonstring)))
    return res.json(resultsApple);
})

router.get('/all-reverse', async function(req, res, next){
    let {offset} = req.query;
    const response = await AppleSongs.getAllSongsReverse(offset);
    const resultsApple = response.map(data => (JSON.parse(data.jsonstring)))
    return res.json(resultsApple);
})

router.get('/artist-all', async function(req, res, next){
    let {offset} = req.query;
    const response = await AppleSongs.getAllSongsArtist(offset);
    const resultsApple = response.map(data => (JSON.parse(data.jsonstring)))
    return res.json(resultsApple);
})

router.get('/artist-all-reverse', async function (req, res, next){
    let {offset} = req.query;
    const response = await AppleSongs.getAllSongsArtistReverse(offset);
    const resultsApple = response.map(data => (JSON.parse(data.jsonstring)))
    return res.json(resultsApple);
})

router.get('/bpm-all', async function (req, res, next){
    let {offset} = req.query;
    const response = await AppleSongs.getAllSongsBPM(offset);
    const resultsApple = response.map(data => (JSON.parse(data.jsonstring)))
    return res.json(resultsApple);    
})

router.get('/bpm-all-reverse', async function (req, res, next){
    let {offset} = req.query;
    const response = await AppleSongs.getAllSongsBPMReverse(offset);
    const resultsApple = response.map(data => (JSON.parse(data.jsonstring)))
    return res.json(resultsApple);
})

module.exports = router;