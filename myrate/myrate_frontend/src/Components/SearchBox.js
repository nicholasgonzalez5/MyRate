import React, { useState, useEffect } from "react";
import useAxiosGoogleBooks from "../Hooks/useAxiosGoogleBooks";
import { Link } from "react-router-dom";
import useAxiosTMDB from "../Hooks/useAxiosTMDB";
import "./TrendingMovies.css";


const SearchBox = (timeFrame, count) => {

    const [searchEntry, setSearchEntry] = useState("");
    const changed = (e) => {
        console.log(e.target.value);
        e.preventDefault();
        setSearchEntry(e.target.value);
    };

    const submitSearch = (val) => {
        response = val;

    }

    const { response, loading, error } = useAxiosGoogleBooks({
        method: 'get',
        searchterms: searchEntry,
        responseLength: 3,
    });

    /*
    const { movieresponse, movieloading, movieerror } = useAxiosTMDB({
        method: 'get',
        url: `trending/movie/${timeFrame}`,
        sortByPopularity: true,
        responseLength: count,
    });
    */

    const renderSliderList = () => {
        if(response)
        {
            <p>response['items']</p>
            console.log("IN RENDER SLIDER: " + JSON.stringify(response['items'][4][2]));
        }
    }

    return (
        <>
            <div class="container d-flex justify-content-center">
                <div class="row ">
                    <div class="col-md-8">
                        <div class="form-outline">
                            <input type="text" placeholder="Search Media" value={searchEntry} onChange={changed} id="searchBox" class="form-control" />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <button type="button" class="btn btn-primary" onClick={() => renderSliderList(searchEntry)}>Search</button>
                    </div>
                    <dive>
                        <h3>Search Results</h3>
                        {renderSliderList()}
                    </dive>
                </div>
            </div>

        </>
    );
};

export default SearchBox;
