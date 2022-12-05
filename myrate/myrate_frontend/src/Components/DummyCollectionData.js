import React from "react";
import "./CollectionList.css";

function DummyCollectionData(props) {
    let data = [
        { name: "detail1" },
        { name: "detail2" },
        { name: "detail3" },
        { name: "detail4" },
        { name: "detail5" },
        { name: "detail6" },
        { name: "detail7" },
        { name: "detail8" },
        { name: "detail9" },
        { name: "detail10" },
        { name: "detail11" },
        { name: "detail12" },
        { name: "detail13" },
        { name: "detail14" },
        { name: "detail15" },
        { name: "detail16" },
        { name: "detail17" },
        { name: "detail18" },
        { name: "detail19" }
    ];

    return (
            <div class="scroll__wrap">
                {data.map(d => (
                    <button class="scroll--element" id={d.name}>
                        {props.name}: {d.name}
                    </button>
                ))}
            </div>
    );
};


export default DummyCollectionData;
