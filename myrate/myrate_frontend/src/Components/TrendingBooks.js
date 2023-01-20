import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAxiosNYT from "../Hooks/useAxiosNYT";
import "./TrendingBooks.css";


const TrendingBooks = () => {
    let alltrending = useSelector((state) => { return state.trendingBooks; });

    const renderSliderList = (trendingObj) => {
        return (
            <div className="horizontalScroll">
                {trendingObj.bookList.map(book => (
                    <div className="bookDiv">
                        <div className="bookImageDiv">
                            <Link to="/secondary-book-page" state={{ bookDetails: { book } }}>
                                {<img src={book.image} height="275" width="175" />}
                            </Link>
                        </div>
                        {/* Purchase Links have been removed for time being */}
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

    return (
        <>
            {alltrending.map(trendingobj => (
                <div classname="horizontalscroll">
                    <h5 classname="trendinglistdisplayname">{trendingobj.displayname}</h5>
                    {renderSliderList(trendingobj)}
                </div>
            ))}
        </>
    );

};

export default TrendingBooks;
