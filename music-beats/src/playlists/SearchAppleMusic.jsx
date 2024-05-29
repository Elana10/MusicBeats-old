import {useState, useEffect, useContext} from "react";
import LoadingPage from "../common/LoadingPage"
import SearchForm from "../common/SearchForm";
import MusicPlayer from "./MusicPlayer";
import SongCardApple from "./SongCardApple";
import UserContext from "../auth/UserContext";
import './MBSongLibrary.css'

function SearchAppleMusic(){
    const {appleMusicSearch} = useContext(UserContext);

    return (
        <div >
                <h2>Search Apple Music</h2>
                <div className="the-container">
                    <SearchForm />                  
                </div>            

            {appleMusicSearch
                ?  
                <div className="the-container">
                    <div className="songs-div-container">
                        <div className="song-list">
                            <div className="song-head">
                                <div className="song-head-name">Song Name</div>
                                <div className="song-head-artist">Artist</div>
                                <div className="song-head-bpm">Beats Per Minute</div>
                            </div>

                                {appleMusicSearch.map(song => ( 
                                    <SongCardApple song={song}/>
                                ))}

                            <div className="song-footer"></div>
                        </div>              
                    </div>
                </div>
                           

                : <></>
            }



        </div>

    )
}

export default SearchAppleMusic;