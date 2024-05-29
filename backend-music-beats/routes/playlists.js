const express = require('express');
const axios = require('axios');
const getToken = require('../helper/token')
const AppleApi = require('../apis/appleapi')
const ChatApi = require('../apis/chatapi')
const AppleSongs = require('../models/appleSongs');
const Playlists = require('../models/playlists');
const PlaylistsSongs = require('../models/playlists_songs');
const {getSongsDirectSearch, getSongsPlaylistSearch, combineAndRemoveDuplicates} = require('../helper/applesearch')

router = new express.Router();

router.get('/', async function (req, res, next){
    const {term, tempo} = req.query
    const MUT = req.headers['authorization'];

    let responseSongsDirect = await getSongsDirectSearch(term, tempo, MUT)
    let responseSongsPlaylist = await getSongsPlaylistSearch(term, tempo, MUT);
    let responseForUser = combineAndRemoveDuplicates(responseSongsPlaylist, responseSongsDirect);

    return res.json({data: responseForUser});
})

router.post('/create', async function (req, res, next){
    const result = await Playlists.createPlaylist(req.body)
    return res.json({result})
})

router.get('/allplaylists', async function (req, res, next){
    const results = await Playlists.getAllPlaylists();
    return res.json(results)
})

router.get('/userplaylists', async function (req, res, next){
    const {id} = req.query;
    const results = await Playlists.getUserPlaylists(id)
    return res.json(results)
})

router.put('/addsongtoplaylist', async function (req, res, next){
    const {playlistid, songid} = req.body;
    console.log('PLAYLIST AND SON IDs', playlistid, songid)
    const result = await PlaylistsSongs.addSongPlaylist(req.body)
    return res.json(result);
})

router.get('/individualplaylist', async function (req, res, next){
    const {id} = req.query;
    console.log('PlaylistID to get info', id);
    const result = await Playlists.getOnePlaylist(id);

    return res.json(result);
})

router.get('/getsongsonplaylist', async function (req, res, next){
    const {id} = req.query;
    const results = await Playlists.getAllSongsOnPlaylist(id);
    const appleSongs = results.map(data => (JSON.parse(data.jsonstring)))
    return res.json(appleSongs);
    
})

router.post('/removesong', async function (req, res, next){
    const result = await Playlists.removeASongFromPlaylist(req.body);
    return res.json(result)
})

router.post('/delete', async function (req, res, next){
    const {id} = req.body;
    const deletedPlaylist = await Playlists.deleteUserPlaylist(id);
    return res.json(deletedPlaylist);

})

module.exports = router;