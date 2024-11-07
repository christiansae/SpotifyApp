import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import useDebounce from '../../customHooks/debounce';
import './styles.scss';

// Component imports 
import SearchBar from '../../components/SearchBar';

// Interfaces
interface Artist {
    profile: {
        name: string;
    }
}

interface Album {
    data: {
        artists: {
            items: Artist[];
        };
        name: string;
    };
}

interface SpotifySearchResponse {
    albums: {
        items: Album[];
    };
}

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [searchResults, setSearchResults] = useState<SpotifySearchResponse | null>(null);

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
                    const response: AxiosResponse<SpotifySearchResponse> = await axios.get('https://spotify23.p.rapidapi.com/search/', options);
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

    return (
        <div className="home-container">
            <h1 className="home-title">Spotify App</h1>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {searchResults && searchResults.albums.items.length > 0 && (
                <div>{ searchResults.albums.items.map((album, index) => <p key={index}>{album.data.name}</p>) }</div>
            )}
        </div>
    );  
};

export default Home;