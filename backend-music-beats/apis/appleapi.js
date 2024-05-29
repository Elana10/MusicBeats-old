"use strict";
const axios = require('axios');
const getToken = require('../helper/token')
const BASE_URL = 'https://api.music.apple.com/v1'

class AppleApi {
    static async findPlaylist(term){
        const token = await getToken();
        let response = await axios.get(`${BASE_URL}/catalog/us/search?term=${term}`, {headers: 
            {'Authorization' : `Bearer ${token}`,
            'Content-Type' : "application/json"
        }})
        return response.data;
    }

    static async fetchAllSongsInPlaylist(playlistID, MUT){
        const token = await getToken();
        let response = await axios.get(`${BASE_URL}/catalog/us/playlists/${playlistID}/tracks`,
            {
                headers :
                    {'Authorization' : `Bearer ${token}`,
                    'Content-Type' : "application/json",
                    'Music-User-Token' : `${MUT}`
                }
            }
        )
        return response.data        
    }

    static async findSongsWithWords(term, MUT, offset){
        const token = await getToken();
        let response = await axios.get(`${BASE_URL}/catalog/us/search?types=songs&term=${term}&with=topResults&limit=25&offset=${offset-25}`,
            {
                headers :
                    {'Authorization' : `Bearer ${token}`,
                    'Content-Type' : "application/json",
                    'Music-User-Token' : `${MUT}`
                    }
            }
        )

        return response.data;
    }

}

module.exports = AppleApi;