import React, { useEffect, useState } from 'react';

import { NewPostPopup } from '../new-post-popup/new-post-popup.component';
import { PostsTable } from '../posts-table/posts-table.component';

export const Dashboard = ({ setAuth }: any) => {

    const [name, setName] = useState("");

    const getProfile = async () => {
      try {
        const res = await fetch("http://localhost:8080/users/", {
          headers: { token: localStorage.token }
        });
  
        const parseData = await res.json();
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
            <NewPostPopup/>
            <PostsTable/>

        </div>
    )
}