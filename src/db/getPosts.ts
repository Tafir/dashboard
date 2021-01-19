import { Client } from 'pg';

import { clientConfig } from './postgres';

import { PostResponse } from '../models/PostResponse';

export const getPosts = async (userId: string) => {
    const client = new Client(clientConfig);
    client.connect();

    const posts: PostResponse[] = await client
                        .query(`SELECT * FROM posts
                                WHERE user_id = $1`, [userId])
                        .then(res => {
                            return res.rows;
                        })
                        .catch(err => {
                            console.error("Posts not found", err.stack)
                            return null;
                        })
                        .finally(() => {
                            client.end()
                        });
    
    return posts;
};