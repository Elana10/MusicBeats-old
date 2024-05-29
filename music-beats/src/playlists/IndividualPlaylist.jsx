import {useState, useEffect, useContext} from "react";
import LoadingPage from "../common/LoadingPage"
import SearchForm from "../common/SearchForm";
import LoadingSpinner from "../common/LoadingPage";
import SongCardApple from "./SongCardApple";
import port3000Api from "../api/port3000Api";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../auth/UserContext";


function IndividualPlaylists(){
    const {id} = useParams();
    const [allSongs, setAllSongs] = useState(null);
    const [thePlaylist, setThePlaylist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const {userInfo, music, setPlayingNow} = useContext(UserContext);
    const [isUsersPlaylist, setIsUsersPlaylist] = useState(null);
    const navigate = useNavigate();

    useEffect(function getSongsFromPlaylist(){
        async function getAllSongsOnPlaylist(){
            const responseSongs = await port3000Api.getAllSongsOnThePlaylist(id);
            setAllSongs(responseSongs);

            const responsePlaylist = await port3000Api.getIndividualPlaylist(id);

            setThePlaylist(responsePlaylist);
            
            if(responsePlaylist.userid === userInfo.id){
                setIsUsersPlaylist(true);
            } else {
                setIsUsersPlaylist(false);
            }
            setLoading(false)
        }
        getAllSongsOnPlaylist();
    }, [refresh])

    async function removeSongFromPlaylist(songid){
        const response = await port3000Api.removeThisSongFromThisPlaylist(thePlaylist.id, songid)
        setRefresh(!refresh)
    }

    async function playThePlaylist(){
        if(allSongs === null){
            setPlayingNow(allSongs)
            await music.setQueue({items : allSongs});
            await music.play();
            navigate('/playingnow')            
        } else {
            navigate('/playingnow')              
        }

    }

    async function handleDeletePlaylist(){
        const result = await port3000Api.deleteUsersPlaylist(thePlaylist.id)
        navigate('/playlists')
    }


    return (
        <div className="center-div">
            {loading 
                ? <LoadingSpinner/>
                :
                <div className= "center-div">
                    <h2>Playlist: {thePlaylist.name}</h2>
                    <div>
                        {thePlaylist.description}
                    </div>
                    <div className="playlist-options-buttons">
                        <div>
                            <button onClick={playThePlaylist}>Play The Playlist!</button>
                        </div>
                        <div>
                            {isUsersPlaylist
                                ? <button onClick={handleDeletePlaylist}>Delete Playlist</button> 
                                : <></>
                            }
                        </div>                    
                    </div>

                    <div className="the-container">
                        <div className="songs-div-container">
                            <div className="song-list">
                                <div className="song-head">
                                    <div className="song-head-name"
                                    >Song Name</div>
                                    <div className="song-head-artist"
                                    >Artist</div>
                                    <div className="song-head-bpm"
                                    >Beats Per Minute</div>
                                </div>

                                {isUsersPlaylist
                                ?
                                <>
                                    {allSongs.map(song => (
                                        <SongCardApple song={song} removeSongFromPlaylist ={removeSongFromPlaylist}
                                        deleteSong = {removeSongFromPlaylist}
                                        refresh = {refresh}
                                        setRefresh = {setRefresh}
                                        />
                                    ))}
                                </>                               
                                :
                                <>
                                    {allSongs.map(song => (
                                        <SongCardApple song={song}/>
                                    ))}
                                </>                            
                            }

                                <div className="song-footer"></div>
                            </div>              
                        </div>
                    </div>    
                </div>
            }
        </div>

    )
}

export default IndividualPlaylists;