import React from "react";
import Navbar from "../Components/Navbar";
import SignupForm from "../Components/SignupForm";
import { useSelector } from 'react-redux';

const SignupScreen = () => {
    const userProfile = useSelector((state) => { return state.userProfile; });
    return (
        <>
            <Navbar />
            {userProfile.username ? <h2>Welcome back {userProfile.username}!</h2> : <SignupForm />}
        </>
    );
};

export default SignupScreen;