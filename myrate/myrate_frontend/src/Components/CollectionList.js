import React, { useState, useEffect } from "react";
import ScrollMenu from 'react-horizontal-scrolling-menu'
import "./CollectionList.css";

const CollectionList = () => {


    return (
        <div class="wrap">
            <div class="scroll__wrap">
                <div class="scroll--element">Element1</div>
                <div class="scroll--element">Element2</div>
                <div class="scroll--element">Element3</div>
                <div class="scroll--element">Element4</div>
                <div class="scroll--element">Element5</div>
                <div class="scroll--element">Element6</div>
            </div>
        </div>
    );
 
};



export default CollectionList;