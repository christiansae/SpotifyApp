import React, { useState, useEffect } from "react";
import './styles.scss';

type SearchBarProps = {
    searchTerm: string,
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => {

    return (
        <>
            <input className="search-bar" type="text" placeholder="Search For A Track" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </>
    );
};

export default SearchBar;