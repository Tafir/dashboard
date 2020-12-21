import React from "react";

import { UserLoginRequest } from "../../models/UserLoginRequest";

const handleSubmit = (e: any) => {
    e.preventDefault();
    
    const userDetails: UserLoginRequest = {
        email: e.target.email.value,
        password: e.target.password.value,
    };

    console.log(userDetails);
    fetch(`http://localhost:8080/users/login`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails)
    })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err));
}

export const LoginForm = () => {
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="email" id="email" name="email" placeholder="Email" required/>
                </div>
                <div>
                    <input type="password" id="password" name="password" placeholder="Password" required/>
                </div>
                <div>
                    <input type="submit" value="Login"/>
                </div>
            </form>
        </div>
    );
}