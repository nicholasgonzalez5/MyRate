import React from "react";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import "./Navbar.css";

const Navbar = () => {
    return (
        <div id="navbarID">
            <nav class="navbar navbar-expand navbar-light bg-light">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <Link class="nav-link" to="/">Home <span class="sr-only"></span></Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/discover">Discover</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/collections">Collections</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/mystats">MyStats</Link>
                        </li>
                    </ul>
                </div>
                <SearchBox />
            </nav>
        </div>
    );
};

export default Navbar;
