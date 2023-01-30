import React, { useState, useEffect } from "react";
import ScrollMenu from 'react-horizontal-scrolling-menu'
import axios from 'axios';
import "./CollectionList.css";
import CollectionItems from "./CollectionItems";

const CollectionList = () => {

    let [collections, setCollections] = useState([]);
    let [items, setItems] = useState([]);

    const [title, setTitle] = useState();

    const handleClickCollection = e => {
        setTitle(e.target.id);
        //setItems with this collection's media list
    };

    // Fetch collection data of this user from the backend

    useEffect(() => {
        axios.get(`http://localhost:5000/collection`)
            .then(function (response) {
                console.log("response", response);
                // setCollections with data in the response
                setCollections(response.data);
            });
    }, []);

    // TODO: Display the first item in each collection as the cover

    return (
        <>
        <div class="wrap">
            <div class="scroll__wrap">
                {collections.map(c => (
                    <button class="scroll--element" id={c.title} onClick={handleClickCollection}>
                        {c.title}
                    </button>
                ))}
            </div>
            </div>
            {items && <CollectionItems title={title} items={items} />}
        </>
        
    );
 
};



export default CollectionList;
