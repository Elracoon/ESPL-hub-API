import express from 'express';
import userRouter from './users/routes.js'
import projectRouter from './projects/routes.js'
import db from './config/db.js'

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

app.use('/user', userRouter)
app.use('/project', projectRouter)

app.listen(3000, async () => {
    console.log('Starting server on port 3000');
    await db.connect()
});
