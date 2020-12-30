import express from 'express';

import { authorisationMiddleware } from '../middleware/authorisation';

import { getPosts } from '../db/getPosts';

const Router = express.Router();

Router.get( "/posts", authorisationMiddleware, async ( req, res ) => {
    try {
        const posts = await getPosts(req.userId);
        if (!posts) { throw {message: "No posts found"}; }

        res.send({
            status: "success",
            data: {
                posts: posts
            }
        });
    }
    catch (err) {
        res.send({
            status: "error",
            message: "Could not retrieve posts",
            data: err
        });
    }
});


export default Router;