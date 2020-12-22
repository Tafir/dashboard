import { Client } from 'pg';

import { clientConfig } from './postgres';

export const findUser = async (email: string) => {
    const client = new Client(clientConfig);
    client.connect();

    const user = await client
                        .query(`SELECT * FROM users
                                WHERE email = $1`, [email])
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