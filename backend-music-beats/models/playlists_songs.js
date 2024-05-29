"use strict";

const db = require('../db')

class PlaylistsSongs {
    static async addSongPlaylist({playlistid, songid}){
        const duplicateCheck = await db.query(
            `SELECT id 
            FROM playlists_songs
            WHERE playlistid = $1 
            AND songid = $2`,
            [playlistid, songid]
        )
        if(duplicateCheck.rows[0]){
            return;
        }

        const result = await db.query(
            `INSERT INTO playlists_songs
            (playlistid, songid)
            VALUES ($1, $2)
            RETURNING id, playlistid, songid`,
            [playlistid, songid]
        )

        return result.rows[0];
    }

    static async deletePlaylistSong({playlistid, songid}){
        const result = await db.query(
            `DELETE FROM 
            playlists_songs
            WHERE playlistid = $1
            AND songid = $2
            RETURNING playlistid, songid, id`,
            [playlistid, songid]
        )

        return result.rows[0];

    }

}

module.exports = PlaylistsSongs;