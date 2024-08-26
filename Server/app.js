import express  from 'express';
import cors  from 'cors';
import morgan from 'morgan';
import cookieParser from "cookie-parser";
import userRoutes from './routes/userRouts.js';
import courseRoutes from './routes/courseRouts.js';
import paymentRoutes from './routes/paymentRouts.js';
import { config } from 'dotenv';
import errorMiddleware from './middlewares/errorMiddleware.js';
config();
const app = express();
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials : true
}));

app.use(cookieParser());
app.use(morgan('dev'));
app.use('/ping', function(req,res){
    res.send('/pong');
});

// Routes of 3 - Module


app.use('/api/v1/user', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.all('*', (req,res) => {
    res.status(404).send('OOPS!! 404 PAGE NOT FOUND')
});

app.use(errorMiddleware);

export default app;