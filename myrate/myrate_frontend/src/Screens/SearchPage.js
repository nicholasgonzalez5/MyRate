import { React, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useLocation } from 'react-router-dom'
import useAxiosLibraryBooks from "../Hooks/useAxiosLibraryBooks";
import useAxiosGoogleBooks from "../Hooks/useAxiosGoogleBooks";
import "./SearchPage.css";

const SearchPage = () => {

  const [searchKey, setSearchKey] = useState("");

  const [bookDetails, setBookDetails] = useState("");
  const [calls, setCalls] = useState("");

  const location = useLocation();
  const { searchEntry } = location.state;
  console.log("search entry: " + JSON.stringify(searchEntry));

  const { response, loading, error } = useAxiosGoogleBooks({
    method: 'get',
    searchterms: searchEntry,
    specify_type : 'q',
    responseLength: 1000,
});

const { responseb, loadingb, errorb } = useAxiosLibraryBooks({
  method: 'get',
  key: searchKey,
});

const setBookCard = (key, author, title) => {

  console.log("Inside set book card");
  if(!loadingb && responseb)
  {
    var image = "https://covers.openlibrary.org/b/ID/" + responseb.covers[0] + "-M.jpg";
    console.log("Image: " + image);
    var bookTitle = responseb.title;
    var bookAuthor = author;
    var publisher = response.publisher;
    var description = responseb.description.value;

    return (
      <div>
        {
          (responseb.map(book => (
            <><div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <img src={image} alt="Cover Image" style={{width:300, height:300}}></img>
                  </div>
                <div class="flip-card-back">
                  <h3>{book.title}</h3>
                  <p>{book.author_name}</p>
                </div>
              </div>
            </div></>

          )))
        }
      </div>
    )
  }
}

  // gets title/author for every book
  const renderSearchList = (res) => {
    let loadBooks = []
    if (!loading && res) {
      res.docs.map( function(book) {
        // basically we only want to get books that display the cover
        if(typeof book === "object")
        {
          if( typeof book.cover_i === "number")
          {
            console.log("book type: " + typeof book);
            console.log("cover_i: " + typeof book.cover_i);
            console.log("book in add books: " + book.cover_i)
            loadBooks.push(book);
          }
        }

    });
    if(!loading && res)
    {
      return (
        <div style={{display : 'inline-block'}}>
          {
            (loadBooks.map(book => (
              <div class="flip-card" style={{display : 'inline-block'}}>
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                    <img src={"https://covers.openlibrary.org/b/ID/"+book.cover_i +"-M.jpg"} alt="Cover Image" style={{width:180, height:272}}></img>
                    </div>
                  <div class="flip-card-back">
                    <h3>{book.title}</h3>
                    <p>{book.author_name}</p>
                  </div>
                </div>
              </div>

            )))
          }
        </div>
      )

    }
    }
  };

  useEffect(() => {
  }, [loading, error]);


  return (
    <>
      <Navbar />
      <div>
        <h5 class="SearchTitle"> Search Page</h5>
        {renderSearchList(response)}
      </div>
    </>
  )
};


export default SearchPage;