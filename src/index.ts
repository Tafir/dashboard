import express from "express";

import IndexRouter from './routes/index.routes'

const app = express();
const port = 8080;

app.use(IndexRouter);

app.listen(port);