import React from "react";

import { UserLoginRequest } from "../../models/UserLoginRequest";

// CHANGE TYPE HERE
export const LoginForm = ({ setAuth }: any) => {

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
            .then(res => { 
                if (res.status === "error") { throw res.data.message; }

                localStorage.setItem("token", res.data.token);
                setAuth(true);
            })
            .catch(err => console.error(err));
    }

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