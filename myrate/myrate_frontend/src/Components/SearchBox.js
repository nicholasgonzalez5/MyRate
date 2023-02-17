import React, { useState, useEffect } from "react";
import useAxiosGoogleBooks from "../Hooks/useAxiosGoogleBooks";
import { Link } from "react-router-dom";
import useAxiosTMDB from "../Hooks/useAxiosTMDB";
import "./TrendingMovies.css";
import Dropdown from 'react-bootstrap/Dropdown';


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
        if (response) {
            var res = response.items;
            var text = "";

            for (let i = 0; i < res.length; i++) {
                console.log(res[i].volumeInfo.title + "<br>");
                text += res[i].volumeInfo.title + "<br>";
                return (
                    <div>
                        {
                            (res.map(book => (
                                <Dropdown.Item>{book.volumeInfo.title}</Dropdown.Item>

                            )))
                        }
                    </div>
                )
            }

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
                    <div>
                        <Dropdown.Menu show>
                            <Dropdown.Header>Search Results</Dropdown.Header>
                            {renderSliderList()}
                        </Dropdown.Menu>
                    </div>
                </div>
            </div>

        </>
    );
};

export default SearchBox;
