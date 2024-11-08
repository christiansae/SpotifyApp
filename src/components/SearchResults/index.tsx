import React from "react";
import { TrackSearchResponse } from "../../types/TracksInterface";
import './styles.scss';

interface SearchResultsProps {
    searchResults: TrackSearchResponse | null;
    handleAddToPlaylist: (albumName: string) => void;
}

const SearchResults = ({ searchResults, handleAddToPlaylist }: SearchResultsProps) => {
    return (
        <div className="search-results-container">
            {searchResults && searchResults.albums.items.length > 0 && (
                <>{searchResults.albums.items.map((album, index) => 
                    <div className='album' key={index}>
                        <div className='album-name'>{album.data.name}</div>
                        <span className="add-button" onClick={() => handleAddToPlaylist(album.data.name)}>+</span>
                    </div>
                )}
                </>
            )}
        </div>
    );
};

export default SearchResults;