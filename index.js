import express from 'express';
import routes from './app.js';

let server;

const app = express()
app.use(routes)

server = app.listen(3000)
console.log("server connected")
