import React from "react";

import { UserRegistrationRequest } from "../../models/UserRegistrationRequest";

export const RegistrationForm = () => {

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const userDetails: UserRegistrationRequest = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            confirmPassword: e.target.confirmPassword.value
        };

        console.log(userDetails);
        fetch(`http://localhost:8080/users/register`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userDetails)
        })
            .then(res => res.json())
            .then(res => console.log(res));
    }

    return (
    <div>
        <h1> Registration Form</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <input type="text" id="name" name="name" placeholder="Name" required/>
            </div>
            <div>
                <input type="email" id="email" name="email" placeholder="Email" required/>
            </div>
            <div>
                <input type="password" id="password" name="password" placeholder="Password" required/>
            </div>
            <div>
                <input type="password" id="confirm_password" name="confirmPassword" placeholder="Confirm Password" required/>
            </div>
            <div>
                <input type="submit" value="Register"/>
            </div>
        </form>
    </div>
    )
}

