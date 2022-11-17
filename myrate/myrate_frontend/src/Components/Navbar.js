import React from "react";
import SearchBox from "./SearchBox";

const Navbar = () => {
    return (
        <>
            <nav class="navbar navbar-expand navbar-light bg-light">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#Home">Home <span class="sr-only"></span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#Discover">Discover</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#Collections">Collections</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#MyStats">MyStats</a>
                        </li>
                    </ul>
                </div>
                <SearchBox />
            </nav>
        </>
    );
};

export default Navbar;
