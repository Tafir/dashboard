import React, { useState } from 'react';

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { RegistrationForm } from "./components/registration-form/registration-form.component";
import { LoginForm } from "./components/login-form/login-form.component"
import { Dashboard } from "./components/dashboard/dashboard"

import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
              (<LoginForm/>) :
              (<Redirect to="/dashboard"/>)
            }
          />
          <Route 
            path="/dashboard" 
            render={() => 
              isAuthenticated ?
              (<Dashboard/>) :
              (<Redirect to="/login"/>)
            }
          />
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
