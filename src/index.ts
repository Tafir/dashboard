import express from "express";
import bodyParser from "body-parser";
import path from "path";
import session from "express-session";
import passport from "passport";
import cors from 'cors';

import initialisePassport from './passportConfig';

initialisePassport(passport);

import IndexRouter from './routes/index.routes';
import AuthRouter from './routes/auth.routes';

const app = express();
const port = 8080;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // For legacy browser support
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(IndexRouter, AuthRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});