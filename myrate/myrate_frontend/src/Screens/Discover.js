import React from "react";
import Navbar from "../Components/Navbar";
import TrendingBooks from "../Components/TrendingBooks";
import "./Discover.css";

const Discover = () => {
    return (
        <>
            <Navbar />
            <h3 className="trendingBooksHeader">Trending Books</h3>
            <TrendingBooks />
        </>
    );
};

export default Discover;
