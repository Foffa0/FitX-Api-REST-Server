import express from 'express';
import dotenv from 'dotenv';
dotenv.config({path: '../.env'});
import { errorHandler } from './middleware/errorMiddleware.js';
import { runUpdateSchedule } from'./services/studioUpdater.js';
import { connectDB } from'./config/db.js';
import { studioRouter } from './routes/studioRoutes.js';
import { capacityRouter } from './routes/capacityRoutes.js';
import { rateLimiterMiddleware } from './middleware/rateLimiter.js';

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(rateLimiterMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/studios', studioRouter);

app.use('/api/capacity', capacityRouter);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

runUpdateSchedule();