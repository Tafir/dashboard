import express from 'express';

import { test } from "../test.storage";

const Router = express.Router();

Router.get( "/", ( req, res ) => {
    console.log(req.user)
    res.render("index");
});


export default Router;