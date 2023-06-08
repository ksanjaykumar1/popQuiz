import 'express-async-errors';
import { config } from 'dotenv';
config();
import express from 'express';
import * as http from 'http';
import cors from 'cors';

import Logger from './utils/logger';
import morganMiddleware from './utils/morgan';
import connectDB from './db/connect';

const { PORT, MONGO_URI } = process.env;

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = PORT || 3000;

// parse json values
app.use(express.json());

// here we are adding middleware to allow cross-origin requests
app.use(cors());
app.use(morganMiddleware);

// this is a simple route to make sure everything is working properly
const runningMessage = `Server running at http://localhost:${port}`;
app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send(runningMessage);
});

const start = async () => {
  try {
    await connectDB(MONGO_URI);
    Logger.info('Connected to DB');
    await server.listen(port, () => {
      // our only exception to avoiding console.log(), because we
      // always want to know when the server is done starting up
      Logger.info(runningMessage);
    });
  } catch (error) {
    Logger.error(error);
  }
};

start();
