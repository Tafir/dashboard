import express from 'express';

import { test } from "../test.storage";

const Router = express.Router();

Router.get( "/", ( req, res ) => {
    res.send( `Hi ${test.name}! You are ${test.mood}.` );
});


export default Router;