import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import TrendingMovies from "../Components/TrendingMovies"
import TrendingTV from "../Components/TrendingTV"
import './Landing.css'

const Landing = () => {

    return (
        <>
        <Navbar />
        <section>
            <div>
                <div>
                    <div>
                        <div>
                            <h1 className="header">
                                One Platform, All Media
                            </h1>
                            <div>
                                    <button>
                                        Get started
                                    </button>
                                    <Link to="/Discover">
                                        <button>  
                                        Discover
                                        </button>
                                    </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </section>
            < TrendingMovies timeFrame={"day"} movieCount={10} />
            < TrendingTV timeFrame={"day"} tvCount={10} />
        </>
    );
};

export default Landing;
