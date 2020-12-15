import express from 'express';

import { test } from "../test.storage";

const Router = express.Router();

Router.get( "/", ( req, res ) => {
    res.render("index");
});


export default Router;