import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ['https://bicycle-store-nine-flame.vercel.app'],
    credentials: true,
  }),
);

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});
export default app;
