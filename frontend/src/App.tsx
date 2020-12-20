import React from 'react';

import { RegistrationForm } from "./components/registration-form/registration-form.component";
import { LoginForm } from "./components/login-form/login-form.component"

import './App.css';

const App = () => {
  return (
    <div>
      <RegistrationForm/>
      <LoginForm/>
    </div>
  );
}

export default App;
