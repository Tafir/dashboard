import { Client } from 'pg';

import { clientConfig } from './postgres';

import { UserResponse } from '../models/UserResponse';

export const getUser = async (id: string) => {
    const client = new Client(clientConfig);
    client.connect();

    const user: UserResponse = await client
                        .query(`SELECT id, name, email FROM users
                                WHERE id = $1`, [id])
                        .then(res => {
                            return res.rows[0];
                        })
                        .catch(err => {
                            console.error("User not found", err.stack)
                            return null;
                        })
                        .finally(() => {
                            client.end()
                        });
    
    return user;
};