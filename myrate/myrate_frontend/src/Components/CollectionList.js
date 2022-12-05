import React, { useState, useEffect } from "react";
import ScrollMenu from 'react-horizontal-scrolling-menu'
import "./CollectionList.css";

const CollectionList = () => {

    let collections = [
        { name: "item1" },
        { name: "item2" },
        { name: "item3" },
        { name: "item4" },
        { name: "item5" },
        { name: "item6" },
        { name: "item7" },
        { name: "item8" },
        { name: "item9" },
        { name: "item10" },
        { name: "item11" },
        { name: "item12" },
        { name: "item13" },
        { name: "item14" },
        { name: "item15" },
        { name: "item16" },
        { name: "item17" },
        { name: "item18" },
        { name: "item19" },
        { name: "item20" },
        { name: "item21" },
        { name: "item22" },
        { name: "item23" },
        { name: "item24" },
        { name: "item25" }
    ];


    return (
        <div class="wrap">
            <div class="scroll__wrap">
                {collections.map(c => (
                    <div class="scroll--element">
                        {c.name}
                    </div>
                ))}
            </div>
        </div>
    );
 
};



export default CollectionList;