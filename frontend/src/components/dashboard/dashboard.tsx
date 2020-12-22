import React, { useEffect, useState } from 'react';

export const Dashboard = ({ setAuth }: any) => {

    const [name, setName] = useState("");

    const getProfile = async () => {
      try {
        const res = await fetch("http://localhost:8080/users/", {
          headers: { token: localStorage.token }
        });
  
        const parseData = await res.json();
        console.log(parseData);
        setName(parseData.data.user.name);
      } catch (err) {
        console.error(err.message);
      }
    };

    const logout = (e: any) => {
        e.preventDefault();
        try {
          localStorage.removeItem("token");
          setAuth(false);
        } catch (err) {
          console.error(err.message);
        }
      };
    
    useEffect(() => {
        getProfile();
      }, []);
    

    return (
        <div>
            <h1>Hello {name}</h1>
            <button onClick={logout}>Sign out</button>
        </div>
    )
}