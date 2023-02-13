import { React, useEffect, useState } from "react";
import "./ReviewForm.css";
import axios from "axios";

const ReviewForm = (props) => {
    const mediaId = props.mediaId;

    const rate = props.currRate;
    const review = props.currReview;

    const [newRate, setNewRate] = useState(props.currRate);
    const [newReview, setNewReview] = useState(props.currReview);

    const movieReview = () => {
        // find the movie's id to store in review 
        axios.get(`http://localhost:5000/movie/findmovie`, {
            params: {
                title: (props.media.title),
                release_date: (props.media.release_date),
            },
        }).then((response) => {
            // check if review already exists
            const movie = ((response.data));
            axios.get(`http://localhost:5000/rating/findrating`, {
                params: {
                    media_id: movie._id,
                },
            }).then((response) => {
                const review = ((response.data[0]));
                console.log(review);
                // create review
                const reviewData = {
                    stars: newRate,
                    review: newReview,
                    media_type: "movies",
                    media_id: mediaId
                }
                if(!review) {
                // adds rating to database
                axios.post(`http://localhost:5000/rating/add`, reviewData
                ).then(response => {
                    console.log("Posted rating");
                }).catch(response => {
                    console.log("Error saving rating: " + response);
                })
                }
                else {
                    //update rating
                    axios.post(`http://localhost:5000/rating/update/${review._id}`, reviewData
                    ).then(response => {
                    console.log("Updated rating");
                }).catch(response => {
                    console.log("Error saving rating: " + response);
                })
                }
            })

        }).catch(response => {
            console.log(response);
        })
    }

    const tvshowReview = () => {
        // find the show's id to store in review 
        axios.get(`http://localhost:5000/tvshow/findtvshow`, {
            params: {
                name: (props.media.name),
                first_air_date: (props.media.first_air_date),
            },
        }).then(response => {
            // create review
            const reviewData = {
                stars: newRate,
                review: newReview,
                media_type: "tvshows",
                media_id: mediaId
            }
            // adds rating to database
            axios.post(`http://localhost:5000/rating/add`, reviewData
            ).then(response => {
                console.log("Posted rating");
            }).catch(response => {
                console.log("Error saving rating: " + response);
            })
        }).catch(response => {
            console.log(response);
        })

    }

    const submitReview = (e) => {
        e.preventDefault();

        if (props.mediaType === "movie") {
            movieReview();
        }
        else if (props.mediaType === "tvshow") {
            tvshowReview();
        }


    }

    const handleTextChange = (e) => {
        setNewReview(e.target.value);

    }

    const handleChangeSelect = (e) => {
        setNewRate(e.target.value);
        }
    

    return (
        <>
            <form>
                <div class="form-group" className="reviewDiv">
                    <div class="form-group col-md-4">
                        <label for="overallRating">Overall Rating*</label>
                        <select id="overallRating" class="form-control" onChange={handleChangeSelect} value={rate}>
                            <option selected hidden />
                            <option value={1}>Poor</option>
                            <option value={2}>Fair</option>
                            <option value={3}>Average</option>
                            <option value={4}>Good</option>
                            <option value={5}>Excellent</option>
                        </select>
                    </div>
                    <label for="userReview" className="userReviewLabel">Detailed Review For - {props.title}*</label>
                    <textarea class="form-control" id="userReview" rows="3" placeholder="Tell others what you thought!" onChange={handleTextChange} defaultValue={review}></textarea>
                    <button type="submit" class="btn btn-primary" onClick={submitReview}>Post Review</button>
                </div>
            </form>
        </>
    );
};

export default ReviewForm;
