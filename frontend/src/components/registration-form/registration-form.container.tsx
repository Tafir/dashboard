import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { RegistrationForm } from './registration-form.component';

import { UserRegistrationRequest } from '../../models/UserRegistrationRequest';

export const RegistrationFormContainer = () => {
    const initialErrorsArray: Error[] = [];
    const [errors, setErrors] = useState(initialErrorsArray);

    const history = useHistory();

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const userDetails: UserRegistrationRequest = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            confirmPassword: e.target.confirmPassword.value
        };

        console.log(userDetails);
        fetch(`http://localhost:8080/users`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userDetails)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === "error") { throw res.data}
                else { history.push('/login'); }
            })
            .catch(err => {
                setErrors(err);
            });
    };

    return (
        <RegistrationForm handleSubmit={handleSubmit} errors={errors}></RegistrationForm>
    )
}