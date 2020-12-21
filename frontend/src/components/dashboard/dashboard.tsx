import React from 'react';

export const Dashboard = ({ setAuth }: any) => {

    const logout = (e: any) => {
        e.preventDefault();
        try {
          localStorage.removeItem("token");
          setAuth(false);
        } catch (err) {
          console.error(err.message);
        }
      };
    

    return (
        <div>
            <h1>Hello</h1>
            <button onClick={logout}>Sign out</button>
        </div>
    )
}