import React from "react";

interface TrackListProps {
    trackList: string[];
}

const TrackList = ({trackList}: TrackListProps) => {
    return (
        <div className="track-list-container">
            {trackList &&trackList.map((track, index) => (
                <div className="track" key={index}>
                    {track}
                </div>
            ))}
        </div>
    );
};

export default TrackList;