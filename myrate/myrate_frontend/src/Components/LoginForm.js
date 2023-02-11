import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./LoginForm.css";
import { userLogin } from '../store';

const LoginForm = () => {
    var dispatch = useDispatch();
    const userProfile = useSelector((state) => { return state.userProfile; });

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[loginError, setLoginError] = useState(false)

    const handleNameChange = (e) => {
        e.preventDefault();
        setUsername(e.target.value);
    }; 

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    };

    const loginOnSubmit = (e) => {
        e.preventDefault();
        
        // TODO: Hit Backend to Verify Credentials
        const userCredentials = {
            firstName: "dxy",
            lastName: "test",
            email: "dxy.test@hotmail.com",
            username: "dxytest",
            password: "Sneeze+Boat57",
        };
        
        if (username !== userCredentials.username || password !== userCredentials.password) {
            setLoginError(true);
        }
        else {
            setLoginError(false);
            dispatch(userLogin(userCredentials));
        }
    };

    return (
        <>
            <div class="loginFormDiv">
                <h2>Account Login</h2>
                <form class="loginbox" autocomplete="off">
                    <input placeholder="Username" type="text" id="username" value={username} onChange={handleNameChange}></input>
                    <input placeholder="Password" type="password" id="password" value={password} onChange={handlePasswordChange}></input>
                    <button onClick={loginOnSubmit}>Login</button>
                    <p id="invalidLoginText" hidden={!loginError}>Cannot find an account that matches the provided credentials</p>
                </form>
            </div>
            <h2>{userProfile.username}</h2>
        </>
    );
};

export default LoginForm;