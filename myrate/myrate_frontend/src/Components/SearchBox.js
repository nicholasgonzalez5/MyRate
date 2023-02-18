import React, { useState, useEffect } from "react";
import useAxiosGoogleBooks from "../Hooks/useAxiosGoogleBooks";
import { Link } from "react-router-dom";
import useAxiosTMDB from "../Hooks/useAxiosTMDB";
import "./TrendingMovies.css";
import Dropdown from 'react-bootstrap/Dropdown';
import "./SearchBox.css";


const SearchBox = (timeFrame, count) => {

    const [searchEntry, setSearchEntry] = useState("");
    const [showDrop, setShowDrop] = useState(false);

    const changed = (e) => {
        console.log(e.target.value);
        e.preventDefault();
        setSearchEntry(e.target.value);
        if(searchEntry.length <= 1)
            setShowDrop(false);
        else
            setShowDrop(true);
    };

    const submitSearch = (val) => {
        response = val;

    }

    const { response, loading, error } = useAxiosGoogleBooks({
        method: 'get',
        searchterms: searchEntry,
        specify_type : 'q',
        responseLength: 10,
    });

    /*
    const { movieresponse, movieloading, movieerror } = useAxiosTMDB({
        method: 'get',
        url: `trending/movie/${timeFrame}`,
        sortByPopularity: true,
        responseLength: count,
    });
    */

    const renderSliderList = (res) => {
        if (!loading) {
            //var res = res.docs;
            var text = "";
            res = res.docs;
            console.log("before if: " + JSON.stringify(res[0]));
            if(res != undefined)
            {
                for (let i = 0; i < res.length; i++) {
                    console.log("res: " + res[i]);
                    console.log(res[i].title);
                    console.log(res[i].author_name);
                    return (
                        <div>
                            {
                                (res.map(book => (
                                    <Dropdown.Item>
                                        <p>{book.title} by {book.author_name} (Book)</p>
                                        <Dropdown.Divider />
                                    </Dropdown.Item>
                                    
                                )))
                            }
                        </div>
                    )
                }
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
                        <button type="button" class="btn btn-primary" >Search</button>
                    </div>
                    <div>
                        <Dropdown.Menu show = {showDrop? true : false}>
                            {renderSliderList(response)}
                            <Dropdown.Item className="dropdownlink" href="/search-page">
                                View More Results
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </div>
                </div>
            </div>

        </>
    );
};

export default SearchBox;

