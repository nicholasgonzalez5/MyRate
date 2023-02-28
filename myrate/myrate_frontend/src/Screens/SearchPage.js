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
    responseLength: 50,
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
    if (!loading && res) {
      res.docs.map(book => (
        console.log(book.cover_edition_key)
      ))
      return (
        <div>
          {
            (res.docs.map(book => (
              <div class="flip-card">
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                    <img src={"https://covers.openlibrary.org/b/olid/"+book.cover_edition_key +"-M.jpg"} alt="Cover Image" style={{width:180, height:272}}></img>
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