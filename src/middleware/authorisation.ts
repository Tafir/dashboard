import { RequestHandler } from "express";

import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

export const authorisationMiddleware: RequestHandler = async (req, res, next) => {
    try {
        const jwtToken = req.header("token");
        if (!jwtToken) { throw {message: "No JWT token found"}; }

        const payload: any = jwt.verify(jwtToken, process.env.JWT_SECRET);

        req.user = payload.user;
        next();
    }
    catch (err) {
        console.error("Authorization error", err.message);
        return res.send({
            status: "error",
            message: "Unauthorised",
            data: err
        });
    }
}