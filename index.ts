import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { errorHandler } from './middleware/errorMiddleware';
import { connectDB } from './config/db';
import ParkingLotRouter  from './routes/parkingLotRoutes';


//For env File 
dotenv.config();

const app: Application = express();

connectDB();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/userRoutes'));
  app.use('/api/lots', ParkingLotRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});


app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server is Live at http://localhost:${port}`);
});

