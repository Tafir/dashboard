import { Client } from 'pg';

import { clientConfig } from './postgres';

export const getUser = async (id: string) => {
    const client = new Client(clientConfig);
    client.connect();

    const user = await client
                        .query(`SELECT * FROM users
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
    
    console.log(user)
    return user;
};