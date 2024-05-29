import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import SearchAppleMusic from "../playlists/SearchAppleMusic";
import CreatePlaylists from "../playlists/CreatePlaylist";
import MBSongLibrary from "../playlists/MBSongLibrary";
import PlayingNow from "../playlists/PlayingNow";
import Home from "./Home"
import SignUp from "../common/SignUp";
import Login from "../common/Login";
import IndividualPlaylists from "../playlists/IndividualPlaylist";


function RouteList(){

    return (
        <Routes>
            <Route path = "/login"
                element = {<Login/>}
            />

            <Route path = "/signup"
                element = {<SignUp/>}
            />

            <Route path = "/searchapplemusic"
                element = {<SearchAppleMusic/>}
            />

            <Route path = "/playlists"
                element = {<CreatePlaylists/>}
            />

            <Route path = "/mbsonglibrary"
                element = {<MBSongLibrary/>}
            />

            <Route path = "/playingnow"
                element = {<PlayingNow/>}
            />

            <Route path = "/playlist/:id"
                element = {<IndividualPlaylists/>}
            />

            <Route path = '/'
                element = {<Home/>}
            
            />

            <Route path = "*"
                element = {<Navigate to="/" />}
            />
            
        </Routes>
    )
}

export default RouteList;