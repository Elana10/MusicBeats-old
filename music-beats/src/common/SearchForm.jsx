import React, {useContext, useState} from "react";
import port3000Api from "../api/port3000Api";
import UserContext from "../auth/UserContext";

function SearchForm(){
    const {appleMUT, music, setMusic, setPlayingNow, setAppleMusicSearch} = useContext(UserContext)
    let INITIAL_STATE = {term : '', tempo : 'fast'}
    const [termData, setTermData] = useState(INITIAL_STATE)
    
    function handleChange (evt){
        let {name, value} =evt.target;
        setTermData(data => ({...data, [name] : value}))
    }

    async function handleSubmit(evt){
        evt.preventDefault();   
        const res = await port3000Api.getPlaylist( termData.term, appleMUT, termData.tempo)

        setAppleMusicSearch(res.data)
        setPlayingNow(res.data)        
        await music.setQueue({items : res.data})

        setMusic(music)
        setTermData(INITIAL_STATE)
        await music.play()
    }


    return (
        <div className="div-container-form">
            <form onSubmit={handleSubmit}>
                <div className="form-div" >
                    <label htmlFor = "term">Search genre/term/style/inspiration: </label>
                    <input
                        id ="term"
                        name = "term"
                        value={termData.term}
                        onChange = {handleChange}
                        required
                    />
                </div>

                <div className="form-div">
                    <label htmlFor="tempo">Tempo: </label>
                    <select id="tempo"
                            name = "tempo"
                            onChange ={handleChange}
                            value = {termData.tempo}
                            required
                    >
                        <option value = "fast">Fast</option>                          
                        <option value = "slow">Slow</option>
                    </select>
                </div>
                <div className="button-div">
                    <button className="form-submit-button">
                        Submit
                    </button>
                </div>

            </form>
        </div>
    )
}

export default SearchForm;