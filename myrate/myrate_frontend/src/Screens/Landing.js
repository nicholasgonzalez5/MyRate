import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Landing = () => {
    return (
        <>
        <Navbar />
        <section>
            <div>
                <div>
                    <div>
                        <h1>
                            Landing template for MyRate
                        </h1>
                        <div>
                            <p>
                                One platform for all forms of media
                            </p>
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
        </>
    );
};

export default Landing;
