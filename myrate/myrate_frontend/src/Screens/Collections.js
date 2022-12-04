import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import CollectionList from "../Components/CollectionList";


const Collection = () => {
    return (
        <>
            <Navbar />
            <h3>MyRate Collections Page</h3>
            <div>My collections</div>
            <CollectionList />
        </>
    );
};

export default Collection;
