import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import useDebounce from '../../customHooks/debounce';
import { TrackSearchResponse } from '../../types/TracksInterface';
import './styles.scss';

// Component imports 
import SearchBar from '../../components/SearchBar';
import SearchResults from '../../components/SearchResults';
import TrackList from '../../components/Tracklist';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<TrackSearchResponse | null>(null);
    const [trackList, setTrackList] = useState<string[]>([]);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    useEffect(() => {
        const fetchSearchResults = async () => {
            if (debouncedSearchTerm) {
                const options = {
                    params: {
                        q: debouncedSearchTerm,
                        type: 'track',
                        offset: '0',
                        limit: '10',
                        numberOfTopResults: '5'
                    },
                    headers: {
                      'x-rapidapi-key': '86f6a71ebbmshe8d641e3121d033p1b39f7jsncc97103307a9',
                      'x-rapidapi-host': 'spotify23.p.rapidapi.com'
                    }
                  };

                try {
                    const response: AxiosResponse<TrackSearchResponse> = await axios.get('https://spotify23.p.rapidapi.com/search/', options);
                    setSearchResults(response.data);
                    console.log(response.data);
                } catch (error) {
                    console.log(error);
                }
            } else {
                setSearchResults(null);
            }
        };
        fetchSearchResults();
    }, [debouncedSearchTerm]);

    const handleAddToPlaylist = (albumName: string) => {
        if (!trackList.includes(albumName)) {
            setTrackList([...trackList, albumName]);
        }
    };

    const handleRemoveFromPlaylist = (albumName: string) => {
        if (trackList.includes(albumName)){
            setTrackList(trackList.filter((track) => track !== albumName));
        }
    };

    return (
        <div className="home-container">
            <h1 className="home-title">Spotify App</h1>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="main-container">
                <SearchResults searchResults={searchResults} handleAddToPlaylist={handleAddToPlaylist}/>
                <TrackList trackList={trackList} handleRemoveFromPlaylist={handleRemoveFromPlaylist} />
            </div>
        </div>
    );  
};

export default Home;