"use strict"

const express = require("express");
const cors = require("cors");
const morgan = require('morgan');

const playlistRoutes = require('./routes/playlists')
const generateToken = require('./routes/GenerateAppleDevToken')
const authRoutes = require('./routes/auth')
const songsRoutes = require('./routes/songs');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/generate-token", generateToken)
app.use("/playlists", playlistRoutes)
app.use("/auth", authRoutes)
app.use("/songs", songsRoutes)

app.use(function (req, res, next){
    return next()
});

app.use(function (err, req, res, next){
    if(process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error : {message, status}
    });
});

module.exports = app;