import bcrypt from "bcrypt";

import { UserDetails } from '../models/UserDetails';
import { findUser } from "../db/findUser";
import { createUser } from "../db/createUser";

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
    // Form validation
    let validationErrors = checkForValidationErrors(userDetails);
    if (validationErrors.length > 0) { throw validationErrors; }

    //Check if user already exists
    const user = await findUser(userDetails.email);
    if (user) { throw [{message: "User already registered"}]; }

    const hashedPassword = await bcrypt.hash(userDetails.password, 10);

    const databaseErrors: Error[] = [];

    try {
        await createUser(userDetails, hashedPassword);
    }
    catch (error){
        databaseErrors.push(error);
    }
        
    if (databaseErrors.length > 0) { throw databaseErrors; }
}