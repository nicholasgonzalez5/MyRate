import { React, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useLocation } from 'react-router-dom'
import axios from "axios";

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

    // store movie's ID for creating ratings/reviews
    let dbTVId = 0;

    useEffect(() => {
        axios.get(`http://localhost:5000/tvshow/findtvshow`, {
            params: {
                name: (newTVShow.name),
                first_air_date: (newTVShow.first_air_date),
            },
        }).then((response) => {
          console.log(response.data);
          const tvshow = ((response.data));
          if (!tvshow) {
            console.log(`TV Show with name ${JSON.stringify(newTVShow.name)} and air date ${JSON.stringify(newTVShow.first_air_date)} not found`);
            console.log("adding TV Show");
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
          }
          else
          {
            console.log(`TV Show with name ${JSON.stringify(newTVShow.name)} aired on ${JSON.stringify(newTVShow.first_air_date)} with id ${JSON.stringify(tvshow._id)} was found`);
            dbTVId = tvshow.id;
          }
        })
        .catch((response) => {
            console.log("error with axios: " + response);
        });
      }, []);

   

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
