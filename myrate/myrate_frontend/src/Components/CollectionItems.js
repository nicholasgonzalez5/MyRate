import React from "react";
import { Link } from "react-router-dom";
import "./CollectionList.css";
import "../Screens/Collections.css";
import "./TrendingBooks.css";

function CollectionItems(props) {
    console.log(props.items);
    return (
        <>
            <h4 className="myCollectionsHeader">{props.title}</h4>
            <div class="scroll__wrap">
                {props.items.map(i => (
                    <div className="bookDiv">
                        <div className="bookImageDiv">
                            <Link to="/secondary-book-page" state={{ bookDetails: { i } }}>
                                {<img src={i.image} height="200" width="150" />}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};


export default CollectionItems;
