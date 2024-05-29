import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import port3000Api from '../api/port3000Api';


function PlaylistCard({playlist, refresh, setRefresh}){
    const navigate = useNavigate();
    const {setPlayingNow, music, userInfo} = useContext(UserContext);

    async function handlePlay(){
        const results = await port3000Api.getAllSongsOnThePlaylist(playlist.id);
        if(results[0] === undefined){
            navigate('/playingnow')
        } else {
            setPlayingNow(results);
            await music.setQueue({items : results})
            await music.play();
            navigate('/playingnow')            
        }
    }

    async function handleView(){
        navigate(`/playlist/${playlist.id}`)
    }

    async function handleDeletePlaylist(){
        const result = port3000Api.deleteUsersPlaylist(playlist.id)
        setRefresh(!refresh);        
    }

    return (
        <div id={playlist.id} className='playlist-card-div-row'>
            <div className='playlist-name-container'>
                <div className='playlist-name'>{playlist.name}</div>
            </div>
            <div className='playlist-tempo-container'>
                <div className='playlist-tempo'>{playlist.tempo}</div>
            </div>


            <div className='options-div-button'>
                <button onClick={handlePlay}>Play</button>
                <button onClick={handleView}>View Details</button>
                {
                    playlist.userid === userInfo.id
                    ? <button onClick={handleDeletePlaylist}>Delete Playlist</button>
                    : <></>
                }                
            </div>

        </div>
    )

}

export default PlaylistCard;