import React from "react";
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

                let purchaseLinks = [];
                for (let purchaseIdx in listObj.books[bookIdx]['buy_links']) {
                    const url = listObj.books[bookIdx]['buy_links'][purchaseIdx].url;
                    const name = listObj.books[bookIdx]['buy_links'][purchaseIdx].name;

                    if (name === "Amazon" || name === "Apple Books" || name === "Barnes and Noble")
                        purchaseLinks.push({ name, url });
                }
                bookList.push({ image, purchaseLinks });
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
                {trendingObj.bookList.map(item => (
                    <div className="bookDiv">
                        <div className="bookImageDiv">
                            <img src={item.image} height="275" width="175" />
                        </div>
                        {item.purchaseLinks.map(link => (
                            <div className="purchaseLinkDiv">
                                <a href={link.url} target="_blank">
                                    <button className="purchaseButton">Buy from {link.name}</button>
                                </a>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    /* TODO:
     *      Add reasonable behavior for when NYT API throws error or the request times out
     *      Add spinner icon or loading animation as placeholder while request is being made
     */
    return (
        <>
            {!loading && !error && renderTrendingBooks(response)}
        </>
    );
};

export default TrendingBooks;
