const AppleApi = require('../apis/appleapi');
const ChatApi = require('../apis/chatapi');
const AppleSongs = require('../models/appleSongs');
    const slowAdj = ['sleepy', 'slow', 'chill', 'relaxed', 'mellow', 'smooth', 'ambient', 'languid','laid-back', 'downtempo']

async function getSongsDirectSearch(term, tempo, MUT){
    let songsOffset = 26;
    let count = 0;
    let termModified = term;
    let responseForUser = []

    while(responseForUser.length < 20){
        if(tempo === 'slow'){
            termModified = `${slowAdj[count]} ${term}`
        }

        let response = await AppleApi.findSongsWithWords(termModified, MUT, songsOffset);

        let resultsSongs = response.results.songs.data;

        let trackAndArtist = resultsSongs.map(s => {
            return [s.attributes.name, s.attributes.artistName]
        });

        let beatsObj = await ChatApi.getBeats(trackAndArtist);

        for(let i =0; i < resultsSongs.length; i++){
            if(beatsObj[i] === undefined){
                beatsObj[i] = -1;
            }
            resultsSongs[i].bpm = beatsObj[i];
            await AppleSongs.addSong(resultsSongs[i]);

            if(tempo === 'slow'){
                if(beatsObj[i] <= 90 && beatsObj[i] >0){
                    responseForUser.push(resultsSongs[i])
                }
            } 
            
            if(tempo === 'fast'){
                if(beatsObj[i] >= 108){
                    responseForUser.push(resultsSongs[i])
                }
            }

        }

        if(!response.results.next){
            count ++;
            songsOffset = 26;
            if(count > 9){
                return responseForUser;
            }
        }
    }
    console.log('COUNT', count)
    return responseForUser;
}

async function getSongsPlaylistSearch(term, tempo, MUT){
    let count = 0;
    let termModified = term;
    let responseForUser = [];

    while(responseForUser.length < 20){
        if(tempo === 'slow'){
            termModified = `${slowAdj[count]} ${term}`
        }

        let responsePlaylist = await AppleApi.findPlaylist(term);

        if(!responsePlaylist.results.playlists){return []};

        let playlistId = responsePlaylist.results.playlists.data[0].id;

        let responseSongs = await AppleApi.fetchAllSongsInPlaylist(playlistId, MUT);

        let resultsSongs = responseSongs.data
        
        let trackAndArtist = resultsSongs.map(s => {
            return [s.attributes.name, s.attributes.artistName]
        });

        let beatsObj = await ChatApi.getBeats(trackAndArtist);

        for(let i =0; i < resultsSongs.length; i++){
            if(beatsObj[i] === undefined){
                beatsObj[i] = -1;
            }
            resultsSongs[i].bpm = beatsObj[i];
            await AppleSongs.addSong(resultsSongs[i]);

            if(tempo === 'slow'){
                if(beatsObj[i] <= 90 && beatsObj[i] >0){
                    responseForUser.push(resultsSongs[i])
                }
            } 
            
            if(tempo === 'fast'){
                if(beatsObj[i] >= 108){
                    responseForUser.push(resultsSongs[i])
                }
            }

        }

        count ++;
    }
    console.log('COUNT PLAYLIST', count)
    return responseForUser;
}

function combineAndRemoveDuplicates(arr1, arr2){
    const combinedSet = new Set([...arr1, ...arr2]);
    return [...combinedSet]
}

module.exports = {getSongsDirectSearch, getSongsPlaylistSearch, combineAndRemoveDuplicates}