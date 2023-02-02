import { React, useState } from "react";
import "./ReviewForm.css";
import axios from "axios";

const ReviewForm = (props) => {

    console.log(props.currReview);
    console.log(props.currRate);

    const [rate, setRate] = useState(props.currRate);
    const [review, setReview] = useState(props.currReview);
    const mediaId = props.mediaId;

    const submitReview = (e) => {
        e.preventDefault();

        // find the book's id to store in review 
        axios.get(`http://localhost:5000/movie/findmovie`, {
            params: {
                title: (props.media.title),
                release_date: (props.media.release_date),
            },
        }).then(response => {
            // create review
            const reviewData = {
                stars: rate,
                review: review,
                media_type: "movies",
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

    const handleTextChange = (e) => {
        setReview(e.target.value);

    }

    const handleChangeSelect = (e) => {
        setRate(e.target.value);
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
                    <textarea class="form-control" id="userReview" rows="3" placeholder="Tell others what you thought!" onChange={handleTextChange} value={review}></textarea>
                    <button type="submit" class="btn btn-primary" onClick={submitReview}>Post Review</button>
                </div>
            </form>
        </>
    );
};

export default ReviewForm;
