import express from 'express';
import passport from 'passport';

import { register } from '../utils/register'

const Router = express.Router();

Router.post("/users/register", async ( req, res ) => {
    try{
        await register(req.body);
        res.send({
            status: "success", 
            data: { message: "You have been successfully registered!" }
        })
    }
    catch (err) {
        res.send({
            status: "error",
            message: "Registration failed",
            data: err
        })
    }
});

Router.post("/users/login", passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/users/login",
}));

export default Router;