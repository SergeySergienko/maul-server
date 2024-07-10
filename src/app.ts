import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

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
