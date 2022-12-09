import React, { useState } from "react";
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
                                    <button>
                                        Discover
                                    </button>
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
