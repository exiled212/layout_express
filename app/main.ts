import express from 'express';
import { Config } from './config/Config';

const app: express.Application = express();

Config.setConf(app);

export {app};
