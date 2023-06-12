import 'express-async-errors';
import { config } from 'dotenv';
config();
import express from 'express';
import * as http from 'http';
import cors from 'cors';

import Logger from './utils/logger';
import morganMiddleware from './utils/morgan';
import connectDB from './db/connect';
import notFound from './middleware/not-found';
import errorHandler from './middleware/errorHandler';

import authRoutes from './routes/auth';
import investorRoutes from './routes/investor';
import investorPortalRoutes from './routes/investorPortal';
import saleRoutes from './routes/sale';
import assetRoutes from './routes/asset';
import hqRoutes from './routes/hq';

import setup from './utils/initialDBDataSetup';
import { authenticateUser } from './middleware/authentication';

import {
  agent,
  connectionListner,
  importDID,
  initialOutOfBandRecord,
  registerInitialScehmaAndCredDef,
  run,
} from './integration/integration';
import { removeData } from './utils/file';

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
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/investor', authenticateUser, investorRoutes);
app.use('/api/v1/investorPortal', authenticateUser, investorPortalRoutes);
app.use('/api/v1/sale', authenticateUser, saleRoutes);
app.use('/api/v1/asset', authenticateUser, assetRoutes);
app.use('/api/v1/hq', authenticateUser, hqRoutes);

app.use(notFound);
app.use(errorHandler);
const start = async () => {
  try {
    await connectDB(MONGO_URI);
    Logger.info('Connected to DB');
    await setup();
    
    // Agent Setup
    removeData();
    await run();
    await importDID();
    connectionListner(initialOutOfBandRecord);
    console.log('before registering schema and cred def');
    await registerInitialScehmaAndCredDef();
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
