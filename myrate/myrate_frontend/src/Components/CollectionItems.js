import React from "react";
import { Link } from "react-router-dom";
import "./CollectionList.css";
import "../Screens/Collections.css";
import "./TrendingBooks.css";

function Items(props) {
    if (props.k === "books") {
        return (
            <>
            {
                props.v.map(book => (
                    <div className="bookDiv">
                        <div className="bookImageDiv">
                            <Link to="/secondary-book-page" state={{ bookDetails: { book } }}>
                                {<img src={book.image} height="200" width="150" />}
                            </Link>
                        </div>
                    </div>
                ))
            }
            </>
        );
    }
    if (props.k === "movies") {
        return (
            <>
                {
                    props.v.map(movie => (
                    <div className="bookDiv">
                    <div className="moviePosterDiv">
                    <Link to={`/secondary-movie-page/${movie['id']}`} state={{ movieDetails: { movie } }}>
                        {<img src={movie.image} height="255" width="155" />}
                    </Link>
                    </div>
                </div>
                ))
                }
            </>
        );

    }
    if(props.k === "tvshows") {
        return (
            <>
                {
                    props.v.map(tvshow => (
                        <div className="bookDiv">
                            <div className="tvPosterDiv">
                                <Link to={`/secondary-tv-page/${tvshow['id']}`} state={{ tvDetails: { tvshow } } }>
                                    {<img src={tvshow.image} height="255" width="155" />}
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </>
        );
    }
}

function CollectionItems(props) {
    console.log(props.items);
    return (
        //TODO: Need to update this to display correctly for books, movies, and tv shows
        //rn, only goes to book secondary page
        <>
            <h4 className="myCollectionsHeader">{props.title}</h4>
            <div class="scroll__wrap">
                {
                    Object.entries(props.items).map(([key, value]) => (
                        <Items k={key} v={value} />
                    ))
                }
            </div>
        </>
    );
};


export default CollectionItems;
