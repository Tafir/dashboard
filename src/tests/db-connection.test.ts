import { Client } from "pg";

import { clientConfig } from "../db/postgres";

test('Returns all users', () => {
    const client = new Client(clientConfig);
    client.connect();

    return client
        .query("SELECT * FROM users")
        .then(res => {
            // If the connection is unsuccessful or table doesn't exist an error will be thrown.
            // Passes for empty (but initialised) tables
            expect(res.rows.length).toBeGreaterThanOrEqual(0);
        })
        .finally(() => {
            client.end();
        });
});

test('Returns all posts', () => {
    const client = new Client(clientConfig);
    client.connect();

    return client
        .query("SELECT * FROM posts")
        .then(res => {
            // If the connection is unsuccessful or table doesn't exist an error will be thrown.
            // Passes for empty (but initialised) tables
            expect(res.rows.length).toBeGreaterThanOrEqual(0);
        })
        .finally(() => {
            client.end();
        });
});