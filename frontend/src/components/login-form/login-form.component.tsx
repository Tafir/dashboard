import React from "react";

export const LoginForm = () => {
    const handleSubmit = (e: any) => {
        e.preventDefault();
        
        console.log(e.target);
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