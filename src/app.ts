import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import {
  authRouter,
  eventsRouter,
  teamMembersRouter,
  usersRouter,
} from './routes';
import { errorMiddleware } from './middleware';
import { CLIENT_ORIGIN } from './constants';

export const app = express();

app
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .use(cookieParser())
  .use(
    cors({
      credentials: true,
      origin: CLIENT_ORIGIN,
    })
  );

app
  .use('/api/auth', authRouter)
  .use('/api/users', usersRouter)
  .use('/api/events', eventsRouter)
  .use('/api/team-members', teamMembersRouter);
app.use(errorMiddleware);
