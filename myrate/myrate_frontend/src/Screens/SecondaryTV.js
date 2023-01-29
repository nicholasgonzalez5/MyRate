import { React, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useLocation } from 'react-router-dom'
import axios from "axios";
import useAxiosTMDB from "../Hooks/useAxiosTMDB";
import RelatedTitlesSliderList from "../Components/RelatedTitlesSliderList";
import ReviewForm from "../Components/ReviewForm";

const SecondaryTV = () => {

    const location = useLocation();
    const { tvDetails } = location.state;
    const { name, overview, poster_path, first_air_date, id } = tvDetails['tv'];

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

    const { response, loading, error } = useAxiosTMDB({
        method: 'get',
        url: `tv/${id}/similar`,
        sortByPopularity: true,
    });

    useEffect(() => {
        const element = document.getElementById('navbarID');
        element.scrollIntoView({ behavior: "smooth" });
    }, [tvDetails]);

    return (
        <>
            <Navbar />

            <div className="bookDiv">
                <div className="bookImageDiv">
                    <img src={`${prePosterPath}${poster_path}`} height="275" width="175" />
                </div>
            </div>
            <div className="productDetailsDiv">
                <h5 className="productDetailsHeader">Product Details</h5>
                <hr class="solid" />
                <div className="titleInfoDiv">
                    <p><strong>Title: </strong>{name}</p>
                </div>
                <div className="releaseDateInfoDiv">
                    <p><strong>First Aired: </strong>{first_air_date}</p>
                </div>
                <div className="overviewInfoDiv">
                    <p><strong>Overview: </strong>{overview}</p>
                </div>
                <hr class="solid" />
            </div>

            <ReviewForm title={name} />
            <RelatedTitlesSliderList response={response} loading={loading} error={error} isMovie={false} />
        </>
    );
};

export default SecondaryTV;
