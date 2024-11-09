import React from "react";
import './styles.scss';

interface TrackListProps {
    trackList: string[];
    handleRemoveFromPlaylist: (albumName: string) => void;
}

const TrackList = ({trackList, handleRemoveFromPlaylist}: TrackListProps) => {
    return (
        <div className="track-list-container">
            <input className="playlist-title" type="text" placeholder="Name Your Playlist" />
            {trackList && trackList.map((track, index) => (
                <div className="track" key={index}>
                    <div className="track-name">{track}</div>
                    <span className="remove-button" onClick={() => handleRemoveFromPlaylist(track)}>X</span>
                </div>
            ))}
        </div>
    );
};

export default TrackList;