import React, {useContext, useState} from "react";
import UserContext from "../auth/UserContext";
import port3000Api from "../api/port3000Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewPlaylistForm({setAllPlaylists, allPlaylists, refresh, setRefresh, isLoading, setIsLoading}){
    const INITIAL_STATE = {name : '', description : '', tempo : 'fast', term :''};
    const [formData, setFormData] = useState(INITIAL_STATE);
    const {userInfo, appleMUT, music, setMusic, setPlayingNow} = useContext(UserContext);
    const navigate = useNavigate();

    function handleChange(evt){
        let {name, value} =evt.target;
        setFormData(data => ({...data, [name] : value}))
    }

    async function handleSubmit(evt){
        evt.preventDefault()
        setIsLoading(!isLoading)
        formData.id = userInfo.id;
        const newPlaylist = await port3000Api.createPlaylist(formData);
        
        const res = await port3000Api.getPlaylist(formData.term, appleMUT, formData.tempo)

        for(let i = 0; i < res.data.length; i++){
            let addedSong = await port3000Api.addSongToUserPlaylist(newPlaylist.result.id, res.data[i].id)
        }

        setPlayingNow(res.data);
        await music.setQueue({items : res.data})

        setMusic(music)
        await music.play()

        navigate('/playingnow');

        // let allNewList = allPlaylists;
        // allNewList.push(newPlaylist)
        // setAllPlaylists(allNewList)
        // setRefresh(!refresh)
        // setFormData(INITIAL_STATE)
    }

    return (
        <div className="div-container-form">
            <form onSubmit={handleSubmit}>
                <div className="form-div">
                    <label htmlFor = "name">Playlist Name: </label>   
                    <input 
                        className="title-input"
                        id = "name"
                        name = "name"
                        value = {formData.name}     
                        onChange={handleChange}               
                    />                 
                </div>
                <div className="form-div">
                    <label htmlFor = "description">Enter a description of your playlist: </label>
                    <textarea
                        id = "description"
                        name = "description"
                        onChange={handleChange}
                        value = {formData.description}
                    />
                </div>
                <div className="form-div">
                    <label htmlFor="tempo">Tempo: </label>
                    <select id="tempo"
                            name = "tempo"
                            onChange ={handleChange}
                            value = {formData.tempo}
                            required
                    >
                        <option value = "fast">Fast</option>                          
                        <option value = "slow">Slow</option>
                    </select>
                </div>
                <div className="form-div">
                    <label htmlFor = "term">Search genre/style/inspiration: </label>
                    <input
                        id ="term"
                        name = "term"
                        value={formData.term}
                        onChange = {handleChange}
                    />
                </div>
                <div className="button-div">
                    <button className="form-submit-button">Create Playlist</button>
                </div>


            </form>
        </div>
    )
}

export default NewPlaylistForm;