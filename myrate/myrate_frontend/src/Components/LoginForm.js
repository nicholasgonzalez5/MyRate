import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./LoginForm.css";
import { userLogin } from '../store';
import axios from 'axios';

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

    const loginOnSubmit = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.get(`http://localhost:5000/user/finduser/${username}`);

            if (response.data == null) {
                setLoginError(true);
            }
            else {
                const userCredentials = {
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    username: response.data.username,
                    password: response.data.password,
                };

                if (username !== userCredentials.username || password !== userCredentials.password) {
                    setLoginError(true);
                }
                else {
                    setLoginError(false);
                    dispatch(userLogin(userCredentials));
                }
            }
        }
        catch(err){
            console.log("Internal Server Error at userRoutes/user/finduser/:username");
        }
    };

    /*
    * TODO NOTES:
    * When implementing user sign-up functionality:
    *   (response.data == null) --> username does not exist in system and CAN be used
    *   (response.data != null) --> username already exists in system and cannot be used
    */
    const findUsername = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.get(`http://localhost:5000/user/finduser/${username}`);

            if (response.data == null) {
                // Proceed to create new user profile for the provided credentials
                //console.log(`Could not find user with username ${username} in system`);
            }
            else {
                // Prompt the user for a different username, as theirs is already being used
                //console.log(response.data);
            }
        }
        catch(err){
            console.log("Internal Server Error at userRoutes/user/finduser/:username");
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
        </>
    );
};

export default LoginForm;