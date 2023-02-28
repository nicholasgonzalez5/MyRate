import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import './BookSelector.css';

const BookSelector = () => {
    let bookLists = useSelector((state) => { return state.trendingBooks; });
    const [bookCategory, setBookCategory] = useState("");

    let categories = {}
    for (let i = 0; i < bookLists.length; i ++) {
        categories[bookLists[i]["displayName"]] = bookLists[i]["bookList"];
    }

    const onSelectPickerChange = (e) => {
        setBookCategory(e.target.value);
    }

    const renderBookSelector = (bookMapKeys) => {
        return (
            <>
                <select id="bookSelectorDropdown" class="form-select form-select-sm" aria-label=".form-select-sm example" onChange={onSelectPickerChange}>
                {bookMapKeys.map(category => (
                    <option value={category}>{category}</option>
                ))}
             </select>
            </>
        );
    };

    const renderSliderList = (bookCat) => {
        if (bookCat === "") {
            if (bookLists.length > 0) bookCat = bookLists[0]["displayName"];
            else return null
        }
        return (
            <div className="horizontalScroll">
                {categories[bookCat].map(book => (
                    <div className="bookDiv">
                        <div className="bookImageDiv">
                            <Link to="/secondary-book-page" state={{ bookDetails: { book } }}>
                                {<img src={book.image} height="255" width="155" />}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="trendingMovieDiv">
            <h3>Browse Books</h3>
            {renderBookSelector(Object.keys(categories))}
            {renderSliderList(bookCategory)}
        </div>
    );
};

export default BookSelector;
