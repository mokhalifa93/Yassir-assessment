import express, { Express } from 'express';
import config from 'config';
import db from './startup/db';
import cron from './startup/cron';
import routes from './routes/routes';
const app: Express = express();
const port = config.get('PORT');
db();
cron();
routes(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at post: ${port}`);
});