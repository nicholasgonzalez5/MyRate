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
        let currId = e.target.id;
        let selected = null;
        collections.map(c => {
            if(c._id === currId) selected = c;
        })
        console.log(selected);
        setTitle(selected.title);
        //setItems with this collection's media list
        if(selected.books.length !== 0) {
            // fetch and add to items
            selected.books.map(b => {
                setTimeout(() => {
                    console.log(b);
                    axios.get(`http://localhost:5000/book/getbookid/${b}`).then((response) => {
                        setItems([...items, response.data]);
                    }
                    );
                }, 1000);

            })

        }
        if(selected.movies.length !== 0) {
            
        }
        if(selected.tvshows.length !== 0) {
            
        }
        
    };

    // Fetch collection data of this user from the backend

    useEffect(() => {
        axios.get(`http://localhost:5000/collection/getmedia`)
            .then(function (response) {
                console.log("response", response);
                // setCollections with data in the response
                //setCollections(response.data);
            });
    }, []);

    useEffect(() => {
        console.log("fetched");
    }, [items]);

    // TODO: Display the first item in each collection as the cover

    return (
        <>
        <div class="wrap">
            <div class="scroll__wrap">
                {collections.map(c => (
                    <button class="scroll--element" id={c._id} onClick={handleClickCollection}>
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
