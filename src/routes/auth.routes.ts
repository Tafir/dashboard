import express from 'express';

import { authorisationMiddleware } from '../middleware/authorisation';

import { login } from '../utils/login';
import { getUser } from '../db/getUser';
import { register } from '../utils/register';

const Router = express.Router();

Router.get("/users/", authorisationMiddleware, async (req, res) => {
    try {
        const user = await getUser(req.userId);
        if (!user) { throw {message: "User not found"}; }

        res.send({
            status: "success",
            data: {
                user: user
            }
        });
    }
    catch (err) {
        res.send({
            status: "error",
            message: "Could not retrieve user",
            data: err
        });
    }
});

Router.post("/users/", async (req, res) => {
    try {
        await register(req.body);
        res.send({
            status: "success", 
            data: { message: "You have been successfully registered!" }
        });
    }
    catch (err) {
        res.send({
            status: "error",
            message: "Registration failed",
            data: err
        });
    }
});

Router.post("/users/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const jwtTokenAndUser = await login(email, password);

        res.send({
            status: "success",
            message: "You have been successfully logged in",
            data: {
                ...jwtTokenAndUser
            }});
    }
    catch (err) {
        res.send({
            status: "error",
            message: "Login failed",
            data: err
        });
    }
})

Router.get("/users/authorise", authorisationMiddleware, (req,res) => {
    try {
        res.send({
            status: "success",
            message: "Authorisation successful",
            data: { authorised: true }
        })
    }
    catch (err) {
        res.send({
            status: "error",
            message: "Authorisation failed",
            data: err
        });
    }
})

export default Router;