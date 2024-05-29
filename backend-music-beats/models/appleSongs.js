"use strict";

const db = require('../db');

class AppleSongs{

    static async addSong(song){
        const duplicateCheck = await db.query(
            `SELECT appleID
            FROM applesongs
            WHERE appleID = $1`
            , [song.id]);

        if(duplicateCheck.rows[0]){
            return
        }

        const result = await db.query(
            `INSERT INTO applesongs
            (appleID, JSONString, bpm, name, artist) VALUES ($1, $2, $3, $4, $5)`, [song.id, JSON.stringify(song), song.bpm, song.attributes.name, song.attributes.artistName]
        );
    }

    static async getSong(appleID){
        let result = await db.query(`SELECT * FROM applesongs WHERE appleID = $1`, [appleID])

        return result.rows[0];
    } 

    static async getAllSongs(offset){
        let pageSize = 10;
        let newOffset = pageSize * (offset - 1); 
        let result = await db.query(
            `SELECT * FROM applesongs
            ORDER BY name
            LIMIT $1 OFFSET $2`, 
            [pageSize, newOffset]
        )

        return result.rows;
    }

    static async getAllSongsReverse(offset){
        let pageSize = 10;
        let newOffset = pageSize * (offset - 1); 
        let result = await db.query(
            `SELECT * FROM applesongs
            ORDER BY name DESC
            LIMIT $1 OFFSET $2`, 
            [pageSize, newOffset]
        )

        return result.rows;
    }

    static async getAllSongsArtist(offset){
        let pageSize = 10;
        let newOffset = pageSize * (offset - 1); 
        let result = await db.query(
            `SELECT * FROM applesongs
            ORDER BY artist
            LIMIT $1 OFFSET $2`, 
            [pageSize, newOffset]
        )

        return result.rows;
    }

    static async getAllSongsArtistReverse(offset){
        let pageSize = 10;
        let newOffset = pageSize * (offset - 1); 
        let result = await db.query(
            `SELECT * FROM applesongs
            ORDER BY artist DESC
            LIMIT $1 OFFSET $2`, 
            [pageSize, newOffset]
        )

        return result.rows;
    }

    static async getAllSongsBPM(offset){
        let pageSize = 10;
        let newOffset = pageSize * (offset - 1); 
        let result = await db.query(
            `SELECT * FROM applesongs
            ORDER BY bpm
            LIMIT $1 OFFSET $2`, 
            [pageSize, newOffset]
        )

        return result.rows;
    }

    static async getAllSongsBPMReverse(offset){
        let pageSize = 10;
        let newOffset = pageSize * (offset - 1); 
        let result = await db.query(
            `SELECT * FROM applesongs
            ORDER BY bpm DESC
            LIMIT $1 OFFSET $2`, 
            [pageSize, newOffset]
        )

        return result.rows;
    }


}

module.exports = AppleSongs;