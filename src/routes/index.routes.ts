import express from 'express';

import { test } from "../test.storage";

const Router = express.Router();

Router.get( "/", ( req, res ) => {
    console.log(req.user);
    res.send({ message: "test"});
});


export default Router;