import React, {useContext, useEffect, useRef, useState} from "react";
import UserContext from "../auth/UserContext";
import port3000Api from "../api/port3000Api";
import SongCardApple from "./SongCardApple";
import LoadingSpinner from "../common/LoadingPage";

function AddToPlaylistBox({visiblePlaylistBox, setVisiblePlaylistBox, song}){
    const [userPlaylists, setUserPlaylists] = useState(null)
    const {userInfo} = useContext(UserContext);
    const selectRef = useRef(null);


    useEffect(function getUserPlaylists(){
        async function getAllUserPlaylists(){
            const result = await port3000Api.getUserPlaylists(userInfo.id);
            setUserPlaylists(result)

        }

        getAllUserPlaylists();

    },[])

    async function handleAddToPlaylistOption(){
        const selectedPlaylistId = selectRef.current.value
        let params = {playlistid: selectedPlaylistId, songid : song.id}
        const result = await port3000Api.addSongToUserPlaylist(selectedPlaylistId, song.id)
        
        setVisiblePlaylistBox(!visiblePlaylistBox)
    }

    function handleCancelPlaylistRequest(){
        setVisiblePlaylistBox(!visiblePlaylistBox)
    }

    return (
        <>
            {userPlaylists 
                ?        
                <div className="add-song-container">
                    <div className="song-details-add">
                        <label htmlFor="playlist-option">
                            Add {song.attributes.name} by {song.attributes.artistName} to playlist:                
                        </label>  
                    </div>
                    <div className="song-playlist-opt">
                        <select id="playlist-option" name = "playlist-option" ref = {selectRef}>
                            {userPlaylists.map(playopt => (
                                <option value={playopt.id}
                                    key = {playopt.id}
                                >{playopt.name}</option>
                            ))}
                        </select>  
                    </div>
                    <div className="song-playlist-buttons">
                        <button onClick={handleAddToPlaylistOption}>Add To Playlist</button>
                        <button onClick={handleCancelPlaylistRequest}>Cancel</button>
                    </div>
                    

                </div>
                : <LoadingSpinner/>

            }        
        </>


    )

}

export default AddToPlaylistBox;