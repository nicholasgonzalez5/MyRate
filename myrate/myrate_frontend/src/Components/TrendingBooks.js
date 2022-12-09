import React from "react";
import { Link } from "react-router-dom";
import useAxiosNYT from "../Hooks/useAxiosNYT";
import "./TrendingBooks.css";

const TrendingBooks = () => {

    const { response, loading, error } = useAxiosNYT({
        method: 'get',
        url: 'full-overview.json',
    });

    const renderTrendingBooks = (response) => {

        let allTrending = [];
        for (let listIdx in response.results.lists) {
            const listObj = response.results.lists[listIdx];

            let bookList = []
            for (let bookIdx in listObj.books) {
                const image = listObj.books[bookIdx]['book_image'];
                const bookTitle = listObj.books[bookIdx]['title'];
                const bookAuthor = listObj.books[bookIdx]['author'];
                const publisher = listObj.books[bookIdx]['publisher'];
                const isbn_10 = listObj.books[bookIdx]['primary_isbn10'];
                const isbn_13 = listObj.books[bookIdx]['primary_isbn13'];
                const description = listObj.books[bookIdx]['description'];

                let purchaseLinks = [];
                for (let purchaseIdx in listObj.books[bookIdx]['buy_links']) {
                    const url = listObj.books[bookIdx]['buy_links'][purchaseIdx].url;
                    const name = listObj.books[bookIdx]['buy_links'][purchaseIdx].name;

                    if (name === "Amazon" || name === "Apple Books" || name === "Barnes and Noble")
                        purchaseLinks.push({ name, url });
                }
                bookList.push({ image, bookTitle, bookAuthor, publisher, isbn_10, isbn_13, description, purchaseLinks });
            }
            const displayName = listObj['display_name'];
            allTrending.push({ displayName, bookList });
        }
        return (
            <>
                {allTrending.map(trendingObj => (
                    <div className="horizontalScroll">
                        <h5 className="trendingListDisplayName">{trendingObj.displayName}</h5>
                        {renderSliderList(trendingObj)}
                    </div>
                ))}
            </>
        );
    };

    const renderSliderList = (trendingObj) => {
        return (
            <div className="horizontalScroll">
                {trendingObj.bookList.map(book => (
                    <div className="bookDiv">
                        <div className="bookImageDiv">
                            <Link to="/secondary-book-page" state={{ bookDetails: {book} }}>
                                {<img src={book.image} height="275" width="175" />}
                            </Link>
                        </div>
                        {/* Purchase Links have been removed for time being */ }
                        {/*{book.purchaseLinks.map(link => (*/}
                        {/*    <div className="purchaseLinkDiv">*/}
                        {/*        <a href={link.url} target="_blank">*/}
                        {/*            <button className="purchaseButton">Buy from {link.name}</button>*/}
                        {/*        </a>*/}
                        {/*    </div>*/}
                        {/*))}*/}
                    </div>
                ))}
            </div>
        );
    };

    /* TODO:
     *      Add reasonable behavior for when NYT API throws error or the request times out
     *      Add spinner icon or loading animation as placeholder while request is being made
     *      
     *      Look into NYT API Limit:
     *      " 4,000 requests per day and 10 requests per minute.
     *      Suggested to sleep 6 seconds between calls to avoid hitting the per minute rate limit.
     *      If you need a higher rate limit, please contact us at code@nytimes.com. "
     *      
     *      POSSIBLE SOLUTIONS:
     *          Build redux store that contains all data fetched from NYT API upon application startup.
     *          Can we fetch NYT data once per day and store in our own DB's to avoid going over the limit ??
     */
    return (
        <>
            {!loading && !error && renderTrendingBooks(response)}
        </>
    );
};

export default TrendingBooks;
