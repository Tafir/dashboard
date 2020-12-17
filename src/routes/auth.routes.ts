import express from 'express';
import passport from 'passport';

import { register } from '../utils/register'

const Router = express.Router();

Router.get("/users/register", ( req, res ) => {
    res.render("register");
});

Router.post("/users/register", async ( req, res ) => {
    try{
        await register(req.body);
        res.redirect("/users/login");
    }
    catch (err) {
        console.log(err);
        res.render("register", { errors: err })
    }
});

Router.get("/users/login", ( req, res ) => {
    res.render("login");
});

Router.post("/users/login", passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/users/login",
}));

export default Router;