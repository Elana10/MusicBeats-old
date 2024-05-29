import {useState, useEffect, useContext} from "react";
import {useNavigate} from "react-router-dom";
import LoadingPage from "../common/LoadingPage"
import port3000Api from "../api/port3000Api";
import UserContext from "../auth/UserContext";

function SignUp(){
    const navigate = useNavigate();
    const {setJWT, setUserInfo} = useContext(UserContext) 
    const INITIAL_STATE = {email : '', password : '', username :''};
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [error, setError] = useState(null)

    function handleChange(evt){
        let {name, value} =evt.target;
        setFormData(data => ({...data, [name] : value}))
    }

    async function handleSubmit(evt){
        try{
            evt.preventDefault()
            const token = await port3000Api.signUp(formData)
            setJWT(token.token)
            setUserInfo(token.user)
            navigate('/playlists')
        } catch(e){
            setError('Username taken. Please try a different username.')
        }
    }

    return (
        <div className="the-container">
            <form onSubmit={handleSubmit} className="login-signup">
                <div className="space-around">
                    <label htmlFor = "username">Username: </label>   
                    <input 
                        id = "username"
                        name = "username"
                        value = {formData.username}     
                        onChange={handleChange}               
                    />                 
                </div>
                <div className="space-around">
                    <label htmlFor = "email">Email: </label>   
                    <input 
                        id = "email"
                        name = "email"
                        type = "email"
                        value = {formData.email}     
                        onChange={handleChange}               
                    />                 
                </div>
                <div className="space-around">
                    <label htmlFor = "password">Password: </label>   
                    <input 
                        id = "password"
                        name = "password"
                        type = "password"
                        value = {formData.password}     
                        onChange={handleChange}               
                    />
                </div>
                {error? <p>{error}</p> : <></>}
                <div className="login-signup-button-div">
                    <button className="login-signup-button">Sign Up</button>
                </div>
               
            </form>
        </div>
    )
}

export default SignUp;