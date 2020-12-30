import express from 'express';

import { authorisationMiddleware } from '../middleware/authorisation';

const Router = express.Router();

Router.get( "/posts", authorisationMiddleware, ( req, res ) => {
    res.send({ message: "test"});
});


export default Router;