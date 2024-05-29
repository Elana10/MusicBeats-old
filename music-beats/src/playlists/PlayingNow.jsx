import {useState, useEffect, useContext} from "react";
import LoadingPage from "../common/LoadingPage"
import SearchForm from "../common/SearchForm";
import UserContext from "../auth/UserContext";
import MusicPlayer from "./MusicPlayer";
import SongCard from "./SongCardApple";


function PlayingNow(){
    const {playingNow} = useContext(UserContext);
    const [refreshPlaylist, setRefreshPlaylist] = useState(false);

    return (
        <>
            <h2>Playing Now</h2>
            <div className="the-container">
                <MusicPlayer/>                
            </div>
            { playingNow 
                ? 
                <div className="the-container">
                    <div className="songs-div-container">
                        <div className="song-list">
                            <div className="song-head">
                                <div className="song-head-name">Song Name</div>
                                <div className="song-head-artist">Artist</div>
                                <div className="song-head-bpm">Beats Per Minute</div>
                            </div>

                            { playingNow[0] === undefined
                                ? <div> No songs added yet.</div>
                                :
                                <>
                                    {playingNow.map(song => ( 
                                        <SongCard song={song}
                                            refreshPlaylist ={refreshPlaylist}
                                            setRefreshPlaylist = {setRefreshPlaylist}
                                        />
                                    ))}       
                                </>
                        
                            }

                            <div className="song-footer"></div>
                        </div>              
                    </div>
                </div>                
                
                : <></>
            }


        </>

    )
}

export default PlayingNow;