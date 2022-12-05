import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import CollectionList from "../Components/CollectionList";
import "./Collections.css";


const Collection = () => {
    return (
        <>
            <Navbar />
            <h3 className="myCollectionsHeader">My Collections</h3>
            <CollectionList />
        </>
    );
};

export default Collection;
