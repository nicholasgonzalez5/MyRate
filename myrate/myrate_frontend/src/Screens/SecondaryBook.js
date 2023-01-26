import { React, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useLocation } from 'react-router-dom'
import "./SecondaryBook.css";
import axios from "axios";

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
    let dbBookId = 0;

    // 
    useEffect(() => {
        axios.get(`http://localhost:5000/book/findbook`, {
            params: {
                bookTitle: (newBook.bookTitle),
                bookAuthor: (newBook.bookAuthor),
            },
        }).then((response) => {
          console.log(response.data);
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
                .catch(error => {
                    window.alert(error);
                    return;
                });
          }
          else
          {
            console.log(`Book with title ${JSON.stringify(newBook.bookTitle)} by ${JSON.stringify(newBook.bookAuthor)} with id ${JSON.stringify(book._id)} was found`);
            dbBookId = book.id;
          }
        })
        .catch((response) => {
            console.log("error with axios: " + response);
        });
      }, []);

    /*
    fetch(`http://localhost:5000/book/findbook/${newBook.bookTitle}`)
    .then( (response) => {
        console.log("in then");
        if(!response.ok) {
            console.log(`An error has occurred: ${response.statusText}`);
        }
        console.log("response: " + response);
    const book = (JSON.stringify(response));
    console.log("book: " + book);
      if (!book) {
        console.log(`Book with title ${JSON.stringify(newBook.bookTitle)} not found`);
        console.log("adding book");
          fetch("http://localhost:5000/book/add", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newBook),
            })
            .catch(error => {
                window.alert(error);
                return;
            });
      }
      else
      {
        console.log(`Book with title ${JSON.stringify(newBook.bookTitle)} was found`);
      }
    })
    .catch(function (error) {
        console.log("in error");
        console.log(error.response);
    });

    /*
    console.log(response);
   
  
      const book = response.data;
      console.log(book);
      if (!book) {
        console.log(`Book with title ${JSON.stringify(newBook.bookTitle)} not found`);
        //navigate("/");
        //return;
      }
      fetch("http://localhost:5000/book/add", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newBook),
        })
        .catch(error => {
            window.alert(error);
            return;
        });
        
  
  /* 
    axios.post('http://localhost:5000/book/add', JSON.stringify(bookDetails.book))
        .then(function (response) {
            console.log("post method worked");
            console.log(response);
        })
        .catch(function (error) {
            console.log(bookDetails.book);
            console.log(error.response.data);
        });
*/
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
        const reviewData = {
            stars: rate,
            review: review
        } 
        axios.post('http://localhost:5001/api/rating/savereview/', reviewData)
            .then(function (response) {
                //console.log(response);
            })
            .catch(function (error) {
                //console.log(data);
                console.log(error.response.data);
            });

        //TODO: add this rating to the list of ratings for this book
    }

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
                            <option selected hidden/>
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
