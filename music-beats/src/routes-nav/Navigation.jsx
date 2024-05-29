import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import UserContext from '../auth/UserContext';
import './Navigation.css';

function Navigation(){
    const {appleLogout, authorizeApple, isAppleAuth, userInfo} = useContext(UserContext);

    async function handleAppleLogout(){
        await appleLogout();

    }

    async function handleAppleAuth(){
        await authorizeApple();
    }



    function loggedInNav(){
        return (
            <>


                <div className="nav-divs">
                    <NavLink to ='/playlists'>
                        Playlists
                    </NavLink>                    
                </div>
                <div className="nav-divs">
                    <NavLink to ='/searchapplemusic'>
                        Search Apple Music
                    </NavLink>                    
                </div>
                <div className="nav-divs">
                    <NavLink to ='/mbsonglibrary'>
                        MusicBeats Song Library
                    </NavLink>                    
                </div>
                <div className="nav-divs">
                    <NavLink to ='/playingnow'>
                        Currently Playing
                    </NavLink>                    
                </div>
                <div className="nav-divs">
                    <NavLink to="/" onClick ={handleAppleLogout}>
                        Apple Music Logout
                    </NavLink>                    
                </div>                   
            </>
         
        )
    }

    function loggedOutNav(){
        return (
            <>
                { isAppleAuth 
                    ?                 
                        <></>
                    : 
                    <div className="nav-divs">
                        <NavLink to="/" onClick ={handleAppleAuth}>
                            Authorize Apple Music
                        </NavLink>
                    </div>                        

                }
                { userInfo
                    ? <></>
                    :
                        <div className="nav-divs">
                            <NavLink to ='/login'>
                                Login
                            </NavLink>                    
                        </div>                       

                }
  

                <div className="nav-divs">
                    <NavLink to ='/signup'>
                        Sign Up
                    </NavLink>                    
                </div>
            </>
        )
    }


    return (
        <nav>
            <div className="home-navbar">
                <div className="home-div">
                    <NavLink to='/'>
                        Home
                    </NavLink>
                </div>                
            </div>

            <div className="options-nav">
                {isAppleAuth && userInfo
                    ? loggedInNav()
                    : loggedOutNav()
                }                
            </div>


        </nav>
    )
}

export default Navigation;