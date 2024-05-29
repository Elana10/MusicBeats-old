import React, { useState, useEffect } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
// import './App.css'
import port3000Api from './api/port3000Api';
import RouteList from './routes-nav/RoutesList';
import Navigation from './routes-nav/Navigation';
import UserContext from './auth/UserContext';

function App() {
  const [isAppleAuth, setIsAppleAuth] = useState(false);
  const [appleMUT, setAppleMUT] = useState(null);
  const [music, setMusic] = useState(null)
  const [JWT, setJWT] =useState(null)
  const [error, setError] = useState(null)
  const [userInfo, setUserInfo] = useState(null);
  const [playingNow, setPlayingNow] = useState(null);
  const [appleMusicSearch, setAppleMusicSearch] = useState(null);
  

  useEffect(function loadUserInfo(){
    async function getCurrentUser(){
      if(JWT){
        let {username, email, id} = jwt.decode(JWT)
      }
    }
  
  })

  async function appleLogout(){
    await  music.unauthorize();
    setIsAppleAuth(false);
    setMusic(null);
    setAppleMUT(null);
    setUserInfo(null);
    setPlayingNow(null);
    setJWT(null);
    setAppleMusicSearch(null);
  }

  async function authorizeApple(){
    try{
      let newToken = await port3000Api.generateToken()

      await MusicKit.configure({
        developerToken: newToken.newToken,
        app: {
            name: "MusicBeats",
            build: '1978.4.1'
        }
        });  

      const musickit = await MusicKit.getInstance();
      await musickit.authorize();
      
      setIsAppleAuth(true)
      setAppleMUT(musickit.musicUserToken)
      setMusic(musickit)

    } catch (error){
      console.error('Error fetching token: ', error.message)
      setError('Error fetching token.')
    }
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <UserContext.Provider
          value = {
            { music, 
              setMusic,
              appleMUT,
              setAppleMUT,
              authorizeApple, 
              appleLogout, 
              isAppleAuth,
              setIsAppleAuth,
              setJWT, 
              setUserInfo, 
              userInfo,
              playingNow,
              setPlayingNow, 
              appleMusicSearch,
              setAppleMusicSearch
          }}
        >
          <Navigation/>
          <RouteList/>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;

