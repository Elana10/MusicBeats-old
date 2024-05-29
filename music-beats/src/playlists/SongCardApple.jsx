import React, {useContext, useState, useRef} from "react";
import AddToPlaylistBox from "./AddToPlaylistBox";
import UserContext from "../auth/UserContext";
import { useNavigate } from "react-router-dom";

function SongCardApple({song, deleteSong, refresh, setRefresh, refreshPlaylist, setRefreshPlaylist}){
    const [visiblePlaylistBox, setVisiblePlaylistBox] = useState(false)
    const {playingNow, setPlayingNow, music} = useContext(UserContext);
    const navigate = useNavigate();

    function handleAddToPlaylist(){
        setVisiblePlaylistBox(!visiblePlaylistBox)
    }

    async function handleRemoveSongFromPlaylist(){
        deleteSong(song.id);
        setRefresh(!refresh)
    }

    async function handlePlaySong(){
        const songid = song.id;
        if(playingNow){
            const playingNowIndex = playingNow.findIndex(data => data.id === songid)
            if(playingNowIndex > -1){
                let playNow = playingNow[playingNowIndex];
                let temp = playingNow;
                temp.splice(playingNowIndex, 1);
                temp.unshift(playNow);
                setPlayingNow(temp);
                if(setRefreshPlaylist){
                    setRefreshPlaylist(!refreshPlaylist);                
                }

                await music.setQueue({items : temp})
                await music.play();
                navigate('/playingnow', {replace: true})
            } else {
                await music.setQueue({items : [song]})
                await music.play();
                setPlayingNow([song])
                navigate('/playingnow')                     
            }
        } else{
            await music.setQueue({items : [song]})
            await music.play();
            setPlayingNow([song])
            navigate('/playingnow')            
        }
    }

    return (
        <>{visiblePlaylistBox 
            ? <AddToPlaylistBox 
                visiblePlaylistBox={visiblePlaylistBox}
                setVisiblePlaylistBox={setVisiblePlaylistBox}
                song = {song}
            />
            :   
            <>
            {deleteSong 
                ?
                <div className="songs-card-div-row">
                <div className="song-name-container-personal">
                    <div className="song-name">{song.attributes.name}</div>
                </div>
                <div className="song-artist-container-personal">
                    <div className="song-artist">{song.attributes.artistName}</div>
                </div>
                <div className="song-bpm-container-personal">
                    <div className="song-bpm">{song.bpm}</div>
                </div>
                <div className="options-div-button-songs-personal"
                >
                    <button onClick={handleAddToPlaylist}>Add to Playlist</button>   
                    <button onClick={handlePlaySong}>Play</button>                                     {deleteSong
                        ? <button onClick={handleRemoveSongFromPlaylist}>Remove Song</button>
                        : <></>
                    } 
                </div>
                </div> 
                :
                <div className="songs-card-div-row">
                    <div className="song-name-container">
                        <div className="song-name">{song.attributes.name}</div>
                    </div>
                    <div className="song-artist-container">
                        <div className="song-artist">{song.attributes.artistName}</div>
                    </div>
                    <div className="song-bpm-container">
                        <div className="song-bpm">{song.bpm}</div>
                    </div>
                    <div className="options-div-button-songs"
                    >
                        <button onClick={handleAddToPlaylist}>Add to Playlist</button>   
                        <button onClick={handlePlaySong}>Play</button>                                     {deleteSong
                            ? <button onClick={handleRemoveSongFromPlaylist}>Remove Song</button>
                            : <></>
                        } 
                    </div>
                </div>                   
            }
            </>
             
            }
        
   
        </>


    )
}

export default SongCardApple;