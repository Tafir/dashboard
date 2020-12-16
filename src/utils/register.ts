import bcrypt from "bcrypt";

import { pool } from '../utils/postgres';
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
    pool.query(`SELECT * FROM users
                WHERE email = '${userDetails.email}'`, (err, results) => {
                    if (err) {
                        throw [err];
                    }
                    else{
                        console.log(results.rows)

                        if (results.rows.length > 0) {
                            throw { message: "User already registered" }
                        }
                        pool.query(`INSERT INTO users (name, email, password)
                                    VALUES ('${userDetails.name}', '${userDetails.email}', '${hashedPassword}')
                                    RETURNING id, password`, (err, results) => {
                                        if (err) {
                                            throw [err];
                                        }
                                        console.log(results.rows);
                                        console.log(`${userDetails.email} is registered!`);
                                    })
                    }
                })

}