import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { errorHandler } from './middleware/errorMiddleware';
import { connectDB } from './config/db';
import UserRouter from './routes/userRoutes';
import ParkingLotRouter  from './routes/parkingLotRoutes';
import ParkingSpaceRouter  from './routes/parkingSpaceRoutes';

//For env File 
dotenv.config();

const app: Application = express();

connectDB();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', UserRouter);
app.use('/api/lots', ParkingLotRouter);
app.use('/api/spaces', ParkingSpaceRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});


app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server is Live at http://localhost:${port}`);
});

