import {useState, useEffect, useContext} from "react";
import NewPlaylistForm from "../common/NewPlaylistForm"
import MusicPlayer from "./MusicPlayer";
import port3000Api from "../api/port3000Api";
import UserContext from "../auth/UserContext";
import PlaylistCard from "./PlaylistCard";
import LoadingSpinner from "../common/LoadingPage";
import "./CreatePlaylist.css"


//This is the route for /playlists

function CreatePlaylists(){
    const [allPlaylists, setAllPlaylists] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const {userInfo} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false)
    useEffect(function getPlaylists(){

        async function getPlaylistsFromDB(){
            const allPlayResults = await port3000Api.getAllPlaylists();
            setAllPlaylists(allPlayResults)            
        }

        getPlaylistsFromDB();
        
    }, [refresh])    

    return (
        <div className="the-container">
            { isLoading
            ? <LoadingSpinner/>
            : 
            <>
                <h2>Create A New Playlist</h2>
                    <NewPlaylistForm setAllPlaylists = {setAllPlaylists} 
                                    allPlaylists = {allPlaylists}
                                    refresh = {refresh}
                                    setRefresh = {setRefresh}
                                    isLoading = {isLoading}
                                    setIsLoading = {setIsLoading}
                    />                  
                {allPlaylists 
                    ? <div className="playlist-div-container">
                            <h2>My Playlists</h2>
                            <div className="playlist-list">
                                    <div className="play-head">
                                        <div className="play-head-name">Playlist Name</div>
                                        <div className="div-head-tempo">Tempo</div>              
                                    </div>
                                {allPlaylists
                                    .filter(playlist => playlist.userid === userInfo.id)
                                    .map(playlist => (
                                        <PlaylistCard playlist = {playlist}
                                        refresh = {refresh}
                                        setRefresh = {setRefresh}
                                        />
                                    ))
                                }
                                <div className="play-footer"></div>
                            </div>
                
                            <h2>All Playlists</h2>
                            <div className="playlist-list">
                                    <div className="play-head">
                                        <div className="play-head-name">Playlist Name</div>
                                        <div className="div-head-tempo">Tempo</div>              
                                    </div>
                                {allPlaylists
                                    .filter(playlist => playlist.userid !== userInfo.id)
                                    .map(playlist => (
                                        <PlaylistCard playlist={playlist}/>
                                    ))
                                }                               <div className="play-footer"></div>
                            </div>
                        </div>
                    :
                    <div>
                        <LoadingSpinner/>
                    </div>
                    
                }            
            </>

            }




        </div>

    )
}

export default CreatePlaylists;