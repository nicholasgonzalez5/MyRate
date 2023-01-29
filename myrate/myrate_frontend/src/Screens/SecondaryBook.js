import { React, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useLocation } from 'react-router-dom'
import "./SecondaryBook.css";
import axios from "axios";

let dbBookId = 0;
let ratingsList = null;
const SecondaryBook = () => {
    const [rate, setRate] = useState();
    const [review, setReview] = useState();

    const location = useLocation();
    const { bookDetails } = location.state;
    const { image, bookTitle, bookAuthor, publisher, isbn_10, isbn_13, description, purchaseLinks } = bookDetails.book;
    const newBook = {
        image: image,
        bookTitle: bookTitle,
        bookAuthor: bookAuthor,
        publisher: publisher,
        isbn_10: isbn_10,
        isbn_13: isbn_13,
        description: description,
        purchaseLinks: purchaseLinks,
    };

    // store book's ID for creating ratings/reviews


    // 
    useEffect(() => {
        axios.get(`http://localhost:5000/book/findbook`, {
            params: {
                bookTitle: (newBook.bookTitle),
                bookAuthor: (newBook.bookAuthor),
            },
        }).then((response) => {
            const book = ((response.data));
            if (!book) {
                console.log(`Book with title ${JSON.stringify(newBook.bookTitle)} and author ${JSON.stringify(newBook.bookAuthor)} not found`);
                console.log("adding book");
                fetch("http://localhost:5000/book/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newBook),
                })
                    .then(res => {
                        console.log("response from add: " + res);
                    })
                    .catch(error => {
                        console.log(error);
                        return;
                    });
            }
            else {
                console.log(`Book with title ${JSON.stringify(newBook.bookTitle)} by ${JSON.stringify(newBook.bookAuthor)} with id ${JSON.stringify(book._id)} was found`);
                dbBookId = book._id;

                axios.get(`http://localhost:5000/rating/findrating`, {
                    params: {
                        media_type: "books",
                        media_id: dbBookId,
                    },
                })
                .then(response => {
                    ratingsList = (response.data);
                    console.log(response.data);
                }).catch((response) => {
                    console.log("Error finding ratings: " + response);
                })
                ratingsList.foreach(element => console.log(element));

            }
        })
            .catch((response) => {
                console.log("error with axios: " + response);
            });
    }, []);


    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
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

    const handleTextChange = (e) => {
        setReview(e.target.value);

    }


    const submitReview = (e) => {
        e.preventDefault();

        // find the book's id to store in review 
        axios.get(`http://localhost:5000/book/findbook`, {
            params: {
                bookTitle: (newBook.bookTitle),
                bookAuthor: (newBook.bookAuthor),
            },
        }).then(response => {
            // create review
            const reviewData = {
                stars: rate,
                review: review,
                media_type: "books",
                media_id: dbBookId
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
    /*
    // get list of ratings for this book
    ratingsList = axios.get(`http://localhost:5000/rating/findrating`, {
            params: {
                media_type: "books",
                media_id: dbBookId,
            },
        }).catch((response) => {
            console.log("Error finding ratings: " + response);
        })
    ratingsList.foreach(element => console.log(element));
*/
    return (
        <>
            <Navbar />
            <div className="bookDiv">
                <div className="bookImageDiv">
                    <img src={image} height="325" width="200" />
                </div>
                {purchaseLinks.map(link => (
                    <div className="purchaseLinkDiv">
                        <a href={link.url} target="_blank">
                            <button className="purchaseButton">Buy from {link.name}</button>
                        </a>
                    </div>
                ))}
            </div>
            <div className="productDetailsDiv">
                <h5 className="productDetailsHeader">Product Details</h5>
                <hr class="solid" />
                <div className="titleInfoDiv">
                    {bookTitle && <p><strong>Title: </strong>{toTitleCase(bookTitle)}</p>}
                </div>
                <div className="authorInfoDiv">
                    {bookAuthor && <p><strong>Author: </strong>{bookAuthor}</p>}
                </div>
                <div className="publisherInfoDiv">
                    {publisher && <p><strong>Publisher: </strong>{publisher}</p>}
                </div>
                <div className="isbn-10-InfoDiv">
                    {isbn_10 && <p><strong>ISBN-10: </strong>{isbn_10}</p>}
                </div>
                <div className="isbn-13-InfoDiv">
                    {isbn_13 && <p><strong>ISBN-13: </strong>{isbn_13}</p>}
                </div>
                <div className="descriptionInfoDiv">
                    {description && <p><strong>Description: </strong>{description}</p>}
                </div>
                <hr class="solid" />
            </div>

            <form>
                <div class="form-group" className="userReviewDiv">
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
                    <label for="userReview" className="userReviewLabel">Detailed Review For - {toTitleCase(bookTitle)}*</label>
                    <textarea class="form-control" id="userReview" rows="3" placeholder="Tell others what you thought!" onChange={handleTextChange}></textarea>
                    <button type="submit" class="btn btn-primary" onClick={submitReview}>Post Review</button>
                </div>
            </form>
        </>
    );
};

export default SecondaryBook;
