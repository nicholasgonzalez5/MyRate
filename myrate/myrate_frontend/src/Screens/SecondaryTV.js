import { React } from "react";
import Navbar from "../Components/Navbar";
import { useLocation } from 'react-router-dom'

const SecondaryTV = () => {

    const location = useLocation();
    const { tvDetails } = location.state;
    const { name, overview, poster_path, first_air_date } = tvDetails['tv'];

    // Saves movie to database
    const newTVShow = {
        name: name,
        overview: overview,
        poster_path: poster_path,
        first_air_date: first_air_date,
    };

    fetch("http://localhost:5000/tvshow/add", {
     method: "POST",
          headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newTVShow),
   })
   .catch(error => {
     window.alert(error);
     return;
   });

    // Base URL that needs to be pre-pended to 'poster_path'
    const prePosterPath = "https://image.tmdb.org/t/p/original";

    // Disclaimer that needs to be included when using TMDB API data
    const disclaimer = "This product uses the TMDB API but is not endorsed or certified by TMDB.";

    //console.log(tvDetails);

    return (
        <>
            <Navbar />
            <h2>Place Holder For Seconday TV Page</h2>
            <img src={`${prePosterPath}${poster_path}`} height="275" width="175" />
            <p>Title: {name}</p>
            <p>First Aired: {first_air_date}</p>
            <p>Overview: {overview}</p>
            <p className="disclaimerTMBD">{disclaimer}</p>
        </>
    );
};

export default SecondaryTV;
