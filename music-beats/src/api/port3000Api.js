import axios from "axios";
import { useContext } from "react";

const BASE_URL = "http://localhost:3001";

class port3000Api {
    static token;

    static async generateToken(){
        let res = await axios.get(`${BASE_URL}/generate-token`, {headers : {'Cache-Control' : 'no-cache'}})
        return res.data;
    }

    static async getPlaylist(genre, MUT, speed){
        const params = {term : genre, tempo : speed}
        const headers = {'Cache-Control' : 'no-cache',
                        'Authorization' : `${MUT}`
                        }
        let res = await axios.get(`${BASE_URL}/playlists`, {params : params, headers: headers})
        return res.data
    }

    static async signUp(data){
        let res = await axios.post(`${BASE_URL}/auth/signup`, data)
        return res.data
    }

    static async login(data){
        let res = await axios.post(`${BASE_URL}/auth/login`, data)
        return res.data
    }

    static async createPlaylist(data){
        let res = await axios.post(`${BASE_URL}/playlists/create`, data);
        return res.data;
    }

    static async getAllPlaylists(){
        let res = await axios.get(`${BASE_URL}/playlists/allplaylists`)
        return res.data
    }

    static async getUserPlaylists(id){
        let params = {id : id}
        let res = await axios.get(`${BASE_URL}/playlists/userplaylists`, {params})
        return res.data;
    }

    static async getAllMusicBeatsSongsByName(page){
        let params = {offset: page}
        let res = await axios.get(`${BASE_URL}/songs/all`, {params})
        return res.data;
    }

    static async getAllMusicBeatsSongsByNameReverse(page){
        let params = {offset: page}
        let res = await axios.get(`${BASE_URL}/songs/all-reverse`, {params})
        return res.data;
    }

    static async getAllMusicBeatSongsByArtist(page){
        let params = {offset: page}
        let res = await axios.get(`${BASE_URL}/songs/artist-all`, {params})
        return res.data;
    }

    static async getAllMusicBeatSongsByArtistReverse(page){
        let params = {offset: page}
        let res = await axios.get(`${BASE_URL}/songs/artist-all-reverse`, {params})
        return res.data;
    }

    static async getAllMusicBeatSongsByBPM(page){
        let params = {offset: page}
        let res = await axios.get(`${BASE_URL}/songs/bpm-all`, {params})
        return res.data;
    }

    static async getAllMusicBeatSongsByBPMReverse(page){
        let params = {offset: page}
        let res = await axios.get(`${BASE_URL}/songs/bpm-all-reverse`, {params})
        return res.data;
    }

    static async addSongToUserPlaylist(playlistid, songid){
        let params = {playlistid, songid}
        let res = await axios.put(`${BASE_URL}/playlists/addsongtoplaylist`, params)
        return res.data;
    }

    static async getAllSongsOnThePlaylist(id){
        let params = {id}
        let res = await axios.get(`${BASE_URL}/playlists/getsongsonplaylist`, {params})
        return res.data;
    }

    static async removeThisSongFromThisPlaylist(playlistid, songid){
        let params = {playlistid, songid}
        let res = await axios.post(`${BASE_URL}/playlists/removesong`, params)

        return res.data;
    }

    static async getIndividualPlaylist(id){
        let params = {id}
        let res = await axios.get(`${BASE_URL}/playlists/individualplaylist`, {params});
        return res.data;
    }

    static async deleteUsersPlaylist(id){
        let params = {id}
        let res = await axios.post(`${BASE_URL}/playlists/delete`, params)
        return res.data
    }

}

export default port3000Api;