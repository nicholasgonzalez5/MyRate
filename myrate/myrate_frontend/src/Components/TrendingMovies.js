import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosTMDB from "../Hooks/useAxiosTMDB";
import "./TrendingMovies.css";


const TrendingMovies = ({timeFrame, movieCount }) => {
    const { response, loading, error } = useAxiosTMDB({
        method: 'get',
        url: `trending/movie/${timeFrame}`,
        sortByPopularity: true,
        responseLength: movieCount,
    });

    // Base URL that needs to be pre-pended to 'poster_path'
    const prePosterPath = "https://image.tmdb.org/t/p/original";

    // Disclaimer that needs to be included when using TMDB API data
    const disclaimer = "This product uses the TMDB API but is not endorsed or certified by TMDB.";

    const renderSliderList = (trendingObj) => {
        if (!loading) {
            return (
                <div className="horizontalScroll">
                    {trendingObj.map(movie => (
                        <div className="bookDiv">
                            <div className="moviePosterDiv">
                                <Link to={`/secondary-movie-page/${movie['id']}`} state={{ movieDetails: { movie } }}>
                                    {<img src={`${prePosterPath}${movie['poster_path']}`} height="255" width="155" />}
                                </Link>
                            </div>
                        </div>
                    ))}
                    <p className="disclaimerTMDB">{disclaimer}</p>
                </div>
            );
        }
    };

    useEffect(() => {
    }, [loading, error]);

    return (
        <>
            <div className="trendingMovieDiv">
                <h3>Movies Trending Today</h3>
                {renderSliderList(response)} 
            </div>
        </>
    );

};

export default TrendingMovies;
