import { React, useState } from "react";
import "./ReviewForm.css";

const ReviewForm = ({ title }) => {

    const [rate, setRate] = useState();
    const [review, setReview] = useState();

    const handleTextChange = (e) => {
        setReview(e.target.value);

    }

    const handleChangeSelect = (e) => {
        switch (e.target.value) {
            case 'Poor': setRate(1);
                break;
            case 'Fair': setRate(2);
                break;
            case 'Average': setRate(3);
                break;
            case 'Good': setRate(4);
                break;
            case 'Excellent': setRate(5);
                break;
            default: break;
        }
    }

    return (
        <>
            <form>
                <div class="form-group" className="reviewDiv">
                    <div class="form-group col-md-4">
                        <label for="overallRating">Overall Rating*</label>
                        <select id="overallRating" class="form-control" onChange={handleChangeSelect}>
                            <option selected hidden />
                            <option>Poor</option>
                            <option>Fair</option>
                            <option>Average</option>
                            <option>Good</option>
                            <option>Excellent</option>
                        </select>
                    </div>
                    <label for="userReview" className="userReviewLabel">Detailed Review For - {title}*</label>
                    <textarea class="form-control" id="userReview" rows="3" placeholder="Tell others what you thought!" onChange={handleTextChange}></textarea>
                    <button type="submit" class="btn btn-primary" onClick={() => { }} disabled>Post Review</button>
                </div>
            </form>
        </>
    );
};

export default ReviewForm;
