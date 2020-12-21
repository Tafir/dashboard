import express from 'express';

import { login } from '../utils/login';
import { register } from '../utils/register'

const Router = express.Router();

Router.post("/users/register", async (req, res) => {
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
        const jwtToken = await login(email, password);

        res.send({
            status: "success",
            data: {
                message: "You have been successfully logged in",
                token: jwtToken
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

export default Router;