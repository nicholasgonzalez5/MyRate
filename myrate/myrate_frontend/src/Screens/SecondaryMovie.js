import { React } from "react";
import Navbar from "../Components/Navbar";
import { useLocation } from 'react-router-dom'

const SecondaryMovie = () => {

    const location = useLocation();
    const { movieDetails } = location.state;
    const { title, overview, poster_path, release_date } = movieDetails['movie'];
    const newMovie = {
        title: title,
        overview: overview,
        poster_path: poster_path,
        release_date: release_date,
    };

    fetch("http://localhost:5000/movie/add", {
     method: "POST",
          headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newMovie),
   })
   .catch(error => {
     window.alert(error);
     return;
   });

    // Base URL that needs to be pre-pended to 'poster_path'
    const prePosterPath = "https://image.tmdb.org/t/p/original";

    // Disclaimer that needs to be included when using TMDB API data
    const disclaimer = "This product uses the TMDB API but is not endorsed or certified by TMDB.";

    //console.log(movieDetails);

    return (
        <>
            <Navbar />
            <h2>Place Holder For Seconday Movie Page</h2>
            <img src={`${prePosterPath}${poster_path}`} height="275" width="175" />
            <p>Title: {title}</p>
            <p>Release Date: {release_date}</p>
            <p>Overview: {overview}</p>
            <p className="disclaimerTMBD">{disclaimer}</p>
        </>
    );
};

export default SecondaryMovie;
