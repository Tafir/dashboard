import bcrypt from "bcrypt";

import { client } from '../utils/postgres';
import { UserDetails } from '../interfaces/userDetails';

const checkForValidationErrors = ({ name, email, password, confirmPassword }: UserDetails) => {
    let errors = [];
    if (!name || !email || !password || !confirmPassword) {
        errors.push({message: "Please fill in all of the required fields"});
    }
    else if (password !== confirmPassword) {
        errors.push({message: "Passwords don't match"});
    }
    else if (password.length < 8) {
        errors.push({message: "Password is too short. Minimum password length is 8 characters"});
    }

    return errors;
}

export const register = async (userDetails: UserDetails) => {
    let validationErrors = checkForValidationErrors(userDetails);

    if (validationErrors.length > 0) { throw validationErrors; }

    const hashedPassword = await bcrypt.hash(userDetails.password, 10);

    const databaseErrors: Error[] = [];

    await client
        .connect()
        .catch( err => {
            console.error("Database connection error", err.stack);
            databaseErrors.push(err);
        });

    await client
        .query(`INSERT INTO users (name, email, password) 
                VALUES ('${userDetails.name}', '${userDetails.email}', '${hashedPassword}')`)
        .then( () => { console.log(`${userDetails.email} is registered!`); })
        .catch( err => { 
            console.error("Insertion error", err.stack);
            databaseErrors.push(err);
        })
        .finally( () => { client.end() });
        
    if (databaseErrors.length > 0) { throw databaseErrors; }
}