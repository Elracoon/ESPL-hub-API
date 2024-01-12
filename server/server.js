import express from 'express';
import usersRouter from '../users/routes.js';
import projectsRouter from '../projects/routes.js';
import { createServer } from 'http';


export class Server {
    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use('/users', usersRouter);
        this.app.use('/projects', projectsRouter);

        this.server = createServer(this.app);
    }

    start() {
        this.server.listen(process.env.PORT, async () => {
            console.info(`Server is running on port ${process.env.PORT}`);
        });
    }
}
