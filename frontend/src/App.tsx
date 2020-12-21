import React, { useEffect, useState } from 'react';

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { RegistrationForm } from "./components/registration-form/registration-form.component";
import { LoginForm } from "./components/login-form/login-form.component"
import { Dashboard } from "./components/dashboard/dashboard"

import './App.css';

const App = () => {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:8080/users/authorise", {
        headers: {  token: localStorage.token }
      });

      const parseRes = await res.json();
      console.log(parseRes);
      parseRes.status === "success" ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean: boolean) => {
    setIsAuthenticated(boolean);
  };
  
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route 
            exact 
            path='/' 
            render={() => <Redirect to={isAuthenticated ? "/dashboard" : "/login"}/>}
          />
          <Route 
            path="/register" 
            render={() => 
              !isAuthenticated ?
              (<RegistrationForm/>) :
              (<Redirect to="/dashboard"/>)
            }
          />
          <Route 
            path="/login" 
            render={() => 
              !isAuthenticated ?
              (<LoginForm setAuth={setAuth}/>) :
              (<Redirect to="/dashboard"/>)
            }
          />
          <Route 
            path="/dashboard" 
            render={() => 
              isAuthenticated ?
              (<Dashboard setAuth={setAuth}/>) :
              (<Redirect to="/login"/>)
            }
          />
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
