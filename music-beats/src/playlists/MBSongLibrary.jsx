import {useState, useEffect, useContext, useRef} from "react";
import LoadingPage from "../common/LoadingPage"
import SearchForm from "../common/SearchForm";
import LoadingSpinner from "../common/LoadingPage";
import SongCardApple from "./SongCardApple";
import port3000Api from "../api/port3000Api";


function MBSongLibrary(){
    const [allSongs, setAllSongs] = useState([])
    const [page, setPage] = useState(1);
    const loaderRef = useRef(null);
    const observerRef = useRef(null);
    let [fetchedPage, setFetchedPage] = useState(new Set());
    const [hasMoreSongs, setHasMoreSongs] = useState(true)
    const [sortOption, setSortOption] = useState('name');
    const [refresh, setRefresh] = useState(false)

    useEffect(function getSongs(){
        async function getAllSongs(){
            let res;
            switch (sortOption){
                case 'name':
                    res = await port3000Api.getAllMusicBeatsSongsByName(page);
                    break;
                case 'name-reverse':
                    res = await port3000Api.getAllMusicBeatsSongsByNameReverse(page);
                    break;
                case 'artist':
                    res = await port3000Api.getAllMusicBeatSongsByArtist(page);
                    break;
                case 'artist-reverse':
                    res = await port3000Api.getAllMusicBeatSongsByArtistReverse(page);
                    break;
                case 'bpm':
                    res = await port3000Api.getAllMusicBeatSongsByBPM(page);
                    break;
                case 'bpm-reverse':
                    res = await port3000Api.getAllMusicBeatSongsByBPMReverse(page);
                    break;
            }
            
            setAllSongs(prevData => [...prevData, ...res])
            setFetchedPage(fetchedPage.add(page)); 
            if(res.length === 0){
                setHasMoreSongs(false);
            }           
        }

        if (fetchedPage.has(page)){ 
            return;
        } else {

            if(hasMoreSongs){
                getAllSongs();               
            }
           
        }
    }, [page, refresh]);

    useEffect(function loadMoreSongs(){
        if(observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMoreSongs){
                setPage(prevPage => prevPage +1)
            }
        }, {threshold : 0.8})

        if(loaderRef.current){
            observerRef.current.observe(loaderRef.current)
        };

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, []);

    async function handleNameClick(){
        if(sortOption === 'name'){
            setSortOption('name-reverse');
            setFetchedPage(new Set());
            setHasMoreSongs(true);
            setAllSongs([])
            setPage(1);
            setRefresh(!refresh);
        } else {
            setSortOption('name')
            setFetchedPage(new Set());
            setHasMoreSongs(true);
            setAllSongs([])
            setPage(1);
            setRefresh(!refresh)
        }
    }

    async function handleArtistClick(){
        if(sortOption === 'artist'){
            setSortOption('artist-reverse');
            setFetchedPage(new Set());
            setHasMoreSongs(true);
            setAllSongs([])
            setPage(1);
            setRefresh(!refresh);
        } else {
            setSortOption('artist')
            setFetchedPage(new Set());
            setHasMoreSongs(true);
            setAllSongs([])
            setPage(1);
            setRefresh(!refresh)
        }
    }

    async function handleBPMClick(){
        if(sortOption === 'bpm'){
            setSortOption('bpm-reverse');
            setFetchedPage(new Set());
            setHasMoreSongs(true);
            setAllSongs([])
            setPage(1);
            setRefresh(!refresh);
        } else {
            setSortOption('bpm')
            setFetchedPage(new Set());
            setHasMoreSongs(true);
            setAllSongs([])
            setPage(1);
            setRefresh(!refresh)
        }
    }

    return (
        <>
            <h2>Music Beats Song Library</h2>

            {allSongs 
                ? 
                <div className="the-container">
                    <div className="songs-div-container">
                        <div className="song-list">
                            <div className="song-head">
                                <div className="song-head-name-hover"
                                onClick={handleNameClick} >Song Name</div>
                                <div className="song-head-artist-hover"
                                onClick={handleArtistClick}>Artist</div>
                                <div className="song-head-bpm-hover"
                                onClick={handleBPMClick}>Beats Per Minute</div>
                            </div>

                                {allSongs.map(song => ( 
                                    <SongCardApple song={song}/>
                                ))}

                            <div className="song-footer"></div>
                        </div>              
                    </div>
                </div>                
                
                : <LoadingSpinner/>

            }

            {
                hasMoreSongs &&
                <div ref = {loaderRef} style ={{height : '20px'}}></div>
            }

        </>

    )
}

export default MBSongLibrary;