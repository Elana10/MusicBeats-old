import {useState, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../common/LoadingPage"
import port3000Api from "../api/port3000Api";
import UserContext from "../auth/UserContext";
import './Login.css'

function Login(){
    const navigate = useNavigate();
    const {setJWT, setUserInfo} = useContext(UserContext);
    const INITIAL_STATE = {email : '', password : '', username :''};
    const [formData, setFormData] = useState(INITIAL_STATE);

    function handleChange(evt){
        let {name, value} =evt.target;
        setFormData(data => ({...data, [name] : value}))
    }

    async function handleSubmit(evt){
        evt.preventDefault();
        let result = await port3000Api.login(formData);
        setJWT(result.token)
        setUserInfo(result.user)   
        console.log('TOKEN', result.token)
        console.log('USER', result.user)     
        navigate('/playlists')
    }

    return (
        <div className="the-container">
            <form onSubmit={handleSubmit} className="login-signup">
                <div className="space-around">
                    <label className="f-label" htmlFor = "username">Username: </label>   
                    <input 
                        id = "username"
                        name = "username"
                        value = {formData.username}     
                        onChange={handleChange}               
                    />                 
                </div>
                <div className="space-around">
                    <label className="f-label" htmlFor = "password">Password: </label>   
                    <input 
                        id = "password"
                        name = "password"
                        type = "password"
                        value = {formData.password}     
                        onChange={handleChange}               
                    />
                </div>
                <div className="login-signup-button-div">
                    <button className="login-signup-button">Login</button>                    
                </div>

            </form>
        </div>
    )
}

export default Login;