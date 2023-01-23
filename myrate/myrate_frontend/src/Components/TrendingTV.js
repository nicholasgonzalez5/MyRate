import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosTMDB from "../Hooks/useAxiosTMDB";
import "./TrendingTV.css";


const TrendingTV = ({ timeFrame, tvCount }) => {
    const { response, loading, error } = useAxiosTMDB({
        method: 'get',
        url: `tv/${timeFrame}`,
        sortByPopularity: true,
        responseLength: tvCount,
    });

    // Base URL that needs to be pre-pended to 'poster_path'
    const prePosterPath = "https://image.tmdb.org/t/p/original";

    // Disclaimer that needs to be included when using TMDB API data
    const disclaimer = "This product uses the TMDB API but is not endorsed or certified by TMDB.";

    const renderSliderList = (trendingObj) => {
        if (!loading) {
            return (
                <div className="horizontalScroll">
                    {trendingObj.map(tv => (
                        <div className="bookDiv">
                            <div className="tvPosterDiv">
                                <Link to="/secondary-tv-page" state={{ tvDetails: { tv } }}>
                                    {<img src={`${prePosterPath}${tv['poster_path']}`} height="275" width="175" />}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
    };

    useEffect(() => {
    }, [loading, error]);

    return (
        <>
            <h3>TV Trending Today</h3>
            {renderSliderList(response)}
            <p className="disclaimerTMBD">{disclaimer}</p>
        </>
    );

};

export default TrendingTV;
