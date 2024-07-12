import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { getTeamMembersRouter } from './routes';
import { errorMiddleware } from './middleware';

export const app = express();

app
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .use(cookieParser())
  .use(
    cors({
      credentials: true,
      // origin: process.env.CLIENT_URL,
    })
  );

app.use('/api/team-members', getTeamMembersRouter());
app.use(errorMiddleware);
