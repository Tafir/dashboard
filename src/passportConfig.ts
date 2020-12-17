import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { Client } from 'pg';

import { clientConfig } from './utils/postgres';
import passport, { authenticate } from 'passport';
import { UserDetails } from './interfaces/userDetails';

const authenticateUser = (email: String, password: String, done: Function) => {
    const client = new Client(clientConfig);
    client.connect();

    return client
        .query(`SELECT * FROM users WHERE email = '${email}'`)
        .then( (results) => {
            if (results.rows.length > 0) {
                const user =  results.rows[0];
                return user;
            }
            else { throw { message: "User not found" };}
        })
        .then( async user => { return { isMatch: bcrypt.compare(password, user.password), user: user }; })
        .then( ({isMatch, user}) => { return done(null, isMatch ? user : false); })
        .catch( (err) => {
            console.error("Error while authenticating user", err.stack);
        })
        .finally(() => {client.end()});
}

const initialise = (passport: passport.PassportStatic) => {
    passport.use(
        new LocalStrategy({
            usernameField: "email",
            passwordField: "password"
        },
        authenticateUser
    ));

    passport.serializeUser((user: UserDetails, done: Function) => done(null, user.id));

    passport.deserializeUser((id: String, done: Function) =>{
        const client = new Client(clientConfig);
        client.connect();

        return client
            .query(`SELECT * FROM users where id = '${id}'`)
            .then((result) => {
                return done(null, result.rows[0]);
            })
            .catch((err) => {
                console.error("Error while deserialising the user", err.stack);
            })
            .finally(()=> {client.end()});
    } )
}

export default initialise;