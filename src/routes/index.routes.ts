import express from 'express';

const Router = express.Router();

Router.get( "/", ( req, res ) => {
    res.send({ message: "test"});
});


export default Router;