import { Client } from 'pg';

import { clientConfig } from './postgres';

import { PostDetails } from '../models/PostDetails';

export const createPost = async (postDetails: PostDetails) => {
    let error: any;

    const client = new Client(clientConfig);
    await client
        .connect()
        .catch( err => {
            console.error("Database connection error", err.stack);
            error = err;
        });

    // Field generation

    const category = postDetails.category ? postDetails.category : 'other';
    const dateCreated = Date.now(); // Inappropriate date format? Will PSQL convert to DATE?
    const dateUpdated = dateCreated;

    // Insertion

    await client
        .query(`INSERT INTO posts (user_id, title, content, date_created, date_updated, date_due, category) 
                VALUES ($1, $2, $3)`,
                [postDetails.userId,
                 postDetails.title,
                 postDetails.content,
                 dateCreated,
                 dateUpdated,
                 postDetails.dateDue,
                 category])
        .then( () => { console.log("Post successfuly added"); })
        .catch( err => { 
            console.error("User insertion error", err.stack);
            error = err;
        })
        .finally( () => { client.end() });

    if (error) { throw error; }
}