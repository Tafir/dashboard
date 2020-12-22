import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';

import IndexRouter from './routes/index.routes';
import AuthRouter from './routes/auth.routes';

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // For legacy browser support
}));

app.use(IndexRouter, AuthRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});