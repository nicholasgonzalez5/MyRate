import React from "react";
import Navbar from "../Components/Navbar";
import LoginForm from "../Components/LoginForm";
import { useSelector } from 'react-redux';

const LoginScreen = () => {
    const userProfile = useSelector((state) => { return state.userProfile; });
    return (
        <>
            <Navbar />
            {userProfile.username ? <h2>Welcome back {userProfile.username}!</h2> : <LoginForm />}
        </>
    );
};

export default LoginScreen;