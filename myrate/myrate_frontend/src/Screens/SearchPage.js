import { React, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useLocation } from 'react-router-dom'
import useAxiosLibraryBooks from "../Hooks/useAxiosLibraryBooks";
import useAxiosGoogleBooks from "../Hooks/useAxiosGoogleBooks";

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

  const renderSearchList = (res) => {
    if (!loading && res) {
      console.log("Response: " + JSON.stringify(res));
      return (
        <div>
          {
            (res.docs.map(book => (
                <p >{book.title} by {book.author_name} (Book)</p>

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
        <h5> Search Page</h5>
        {renderSearchList(response)}
      </div>
    </>
  )
};


export default SearchPage;