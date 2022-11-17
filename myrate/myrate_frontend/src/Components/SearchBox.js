import React, { useState } from "react";

const SearchBox = () => {

    const [searchEntry, setSearchEntry] = useState("");
    const handleChange = (e) => {
        e.preventDefault();
        setSearchEntry(e.target.value);
    };

    return (
        <>
            <div class="searchBoxContainer">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchEntry}
                    onChange={handleChange}
                />
                <button type="submit" onClick={() => alert(`Searching For: ${searchEntry}`)}>Search</button>
            </div>
        </>
    );
};

export default SearchBox;
