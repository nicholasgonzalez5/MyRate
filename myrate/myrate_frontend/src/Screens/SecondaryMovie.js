import { React, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useLocation } from 'react-router-dom'
import axios from "axios";

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

        // store movie's ID for creating ratings/reviews
    let dbMovieId = 0;
    let ratingsList = null;

    useEffect(() => {
        axios.get(`http://localhost:5000/movie/findmovie`, {
            params: {
                title: (newMovie.title),
                release_date: (newMovie.release_date),
            },
        }).then((response) => {
          console.log(response.data);
          const movie = ((response.data));
          if (!movie) {
            console.log(`Movie with title ${JSON.stringify(newMovie.title)} and release date ${JSON.stringify(newMovie.release_date)} not found`);
            console.log("adding movie");
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
          }
          else
          {
            console.log(`Movie with title ${JSON.stringify(newMovie.title)} released on ${JSON.stringify(newMovie.release_date)} with id ${JSON.stringify(movie._id)} was found`);
            dbMovieId = movie._id;
          }
        })
        .catch((response) => {
            console.log("error with axios: " + response);
        });
        axios.get(`http://localhost:5000/rating/findrating`, {
                    params: {
                        media_type: "movie",
                        media_id: dbMovieId,
                    },
                })
                .then(response => {
                    ratingsList = (response.data);
                    console.log(response.data);
                }).catch((response) => {
                    console.log("Error finding ratings: " + response);
                })
      }, []);



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
