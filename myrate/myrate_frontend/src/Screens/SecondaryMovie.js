import { React, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useLocation } from 'react-router-dom'
import axios from "axios";
import useAxiosTMDB from "../Hooks/useAxiosTMDB";
import RelatedTitlesSliderList from "../Components/RelatedTitlesSliderList";
import ReviewForm from "../Components/ReviewForm";

const SecondaryMovie = () => {

    const [rate, setRate] = useState();
    const [review, setReview] = useState();
    const [mediaId, setMediaId] = useState();

    const location = useLocation();
    const { movieDetails } = location.state;
    const { title, overview, poster_path, release_date, _id } = movieDetails['movie'];
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
          } else {
            console.log(`Movie with title ${JSON.stringify(newMovie.title)} released on ${JSON.stringify(newMovie.release_date)} with id ${JSON.stringify(movie._id)} was found`);
            dbMovieId = movie._id;
            setMediaId(movie._id);

            axios.get(`http://localhost:5000/rating/findrating`, {
                params: {
                    media_type: "movies",
                    media_id: dbMovieId,
                },
            })
            .then(response => {
                ratingsList = (response.data);
                console.log("findrating result", response.data);
                // set current rating and review to the first value of this list
                // In the future, set it to current user's rating and review
                setRate(ratingsList[0]?.stars);
                setReview(ratingsList[0]?.review);
            }).catch((response) => {
                console.log("Error finding ratings: " + response);
            })
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

    //console.log(movieDetails);

    const { response, loading, error } = useAxiosTMDB({
        method: 'get',
        url: `movie/${_id}/similar`,
        sortByPopularity: true,
    });

    useEffect(() => {
        const element = document.getElementById('navbarID');
        element.scrollIntoView({ behavior: "smooth" });
    }, [movieDetails]);

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
                    <p><strong>Title: </strong>{title}</p>
                </div>
                <div className="releaseDateInfoDiv">
                    <p><strong>Release Date: </strong>{release_date}</p>
                </div>
                <div className="overviewInfoDiv">
                    <p><strong>Overview: </strong>{overview}</p>
                </div>
                <hr class="solid" />
            </div>

            <ReviewForm title={title} currRate={rate} currReview={review} media={newMovie} mediaId={mediaId} mediaType={"movie"}  />
            <RelatedTitlesSliderList response={response} loading={loading} error={error} isMovie={true} />
        </>
    );
};

export default SecondaryMovie;
