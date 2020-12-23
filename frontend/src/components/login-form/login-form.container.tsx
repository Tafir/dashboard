import React, { useState } from 'react';

import { UserLoginRequest } from "../../models/UserLoginRequest";
import { LoginForm } from './login-form.component';

export const LoginFormContainer = ({ setAuth }: any) => {
    const [error, setError] = useState("");


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
            .catch(err => {
                console.error(err);
                setError(err);
            });
    }


    return (
        <LoginForm handleSubmit={handleSubmit} error={error}/>
    )
}
