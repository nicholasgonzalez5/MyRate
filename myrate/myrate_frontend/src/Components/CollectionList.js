import React, { useState, useEffect } from "react";
import ScrollMenu from 'react-horizontal-scrolling-menu'
import axios from 'axios';
import "./CollectionList.css";
import CollectionItems from "./CollectionItems";

const CollectionList = () => {

    let [collections, setCollections] = useState([]);
    let [items, setItems] = useState();
    let [selectedItems, setSelectedItems] = useState();

    const [title, setTitle] = useState();

    const handleClickCollection = e => {
        let currId = e.target.id;
        let selected = null;
        collections.map(c => {
            if(c._id === currId) selected = c;
        })
        console.log(selected);
        setTitle(selected.title);
        setSelectedItems(items[currId]);
        
    };

    // Fetch collection data of this user from the backend

    useEffect(() => {
        axios.get(`http://localhost:5000/collection/getmedia`)
            .then(function (response) {
                // setCollections with data in the response
                setCollections(response.data);
                let itemList = {};
                console.log(response.data);
                response.data.map(d => {
                    itemList[d._id] = {"books": [], "movies": [], "tvshows": []}
                    d.book_list?.map(b => {
                        itemList[d._id]["books"].push(b);
                    });
                    d.movie_list?.map(m => {
                        itemList[d._id]["movies"].push(m);
                    });
                    d.tvshow_list?.map(t => {
                        itemList[d._id]["tvshows"].push(t);
                    });
                });
                setItems(itemList);

            });
    }, []);

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
            {selectedItems && <CollectionItems title={title} items={selectedItems} />}
        </>
        
    );
 
};



export default CollectionList;
