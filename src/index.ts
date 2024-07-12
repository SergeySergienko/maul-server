import 'dotenv/config';
import { app } from './app';
import { runDb } from './repositories';

const PORT = process.env.PORT || 5000;

const startApp = async () => {
  await runDb();
  app.listen(PORT, () =>
    console.log('\x1b[36m%s\x1b[0m', `App is running on ${PORT} port...`)
  );
};

startApp();
