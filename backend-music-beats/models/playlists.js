"use strict"

const db = require('../db');

class Playlists {
    static async createPlaylist({id, name, description, tempo}){
        const result = await db.query(
            `INSERT INTO playlists
            (userid, name, description, tempo)
            VALUES ($1, $2, $3, $4)
            RETURNING id, tempo, name, description`,
            [id, name, description, tempo]
        );
        const newPlaylist = result.rows[0];

        return newPlaylist;
    }

    static async getUserPlaylists(id){
        const result = await db.query(
            `SELECT * FROM playlists
            WHERE userid = $1`,
            [id]
        )
        return result.rows;
    }

    static async getAllPlaylists(){
        const result = await db.query(
            `SELECT * FROM playlists`
        );

        return result.rows;
    }

    static async getOnePlaylist(id){
        const result = await db.query(
            `SELECT * FROM playlists 
            WHERE id = $1`,
            [id]
        );

        return result.rows[0];
    }

    static async getAllSongsOnPlaylist(id){
        const results = await db.query(
            `SELECT s.* 
            FROM applesongs s
            JOIN playlists_songs ps ON s.appleid = ps.songid
            WHERE ps.playlistid = $1`,
            [id]
        )
        
        return results.rows;
    }

    static async removeASongFromPlaylist({playlistid, songid}){
        const result = await db.query(
            `DELETE FROM playlists_songs 
            WHERE songid = $1 
            AND playlistid = $2
            RETURNING *`,
            [songid, playlistid]
        )

        return result.rows[0]
    }

    static async deleteUserPlaylist(id){
        const result = await db.query(
            `DELETE FROM playlists
            WHERE id = $1
            RETURNING id`,
            [id]
        )
        return result.rows[0];
    }

}

module.exports = Playlists;