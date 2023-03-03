import { React, useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
import "./ReviewList.css";

const ReviewList = (props) => {
    const [reviews, setReviews] = useState();

    const userProfile = useSelector((state) => { return state.userProfile;})

    useEffect(() => {
        axios.get(`http://localhost:5000/rating/findothers`, {
                params: {
                    media_id: props.mediaId,
                },
            }).then((response) => {
                console.log("found reviews", response);
                const res = ((response.data));
                setReviews(res);
            }).catch(response => {
                console.log("Error getting ratings: " + response);
            })
    }, [props.mediaId])



    return (
        <>
                <div class="form-group" className="reviewDiv">
                    <h4>Reviews from others</h4>
                    {reviews ? reviews.map(r => (
                        <>
                        <div className="reviewItem">
                            <div className="reviewUser">
                            {r.user_username}
                            </div>
                            <div className="reviewRating">
                                Rating: {r.stars}
                            </div>
                            <div className="reviewContent">{r.review}</div>
                        </div>
                        </>
                    ))
                    : null }
                </div>
        </>
    )
}

export default ReviewList;