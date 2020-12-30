import { Client } from 'pg';

import { clientConfig } from './postgres';

import { UserDetails } from '../models/UserDetails';

export const createUser = async (userDetails: UserDetails, hashedPassword: string) => {
    let error: any;

    const client = new Client(clientConfig);
    await client
        .connect()
        .catch( err => {
            console.error("Database connection error", err.stack);
            error = err;
        });

    await client
        .query(`INSERT INTO users (name, email, password) 
                VALUES ($1, $2, $3)`,[userDetails.name, userDetails.email, hashedPassword])
        .then( () => { console.log(`${userDetails.email} is registered!`); })
        .catch( err => { 
            console.error("Insertion error", err.stack);
            error = err;
        })
        .finally( () => { client.end() });

    if (error) { throw error; }
}