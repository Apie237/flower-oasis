import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

//app config
const app = express();
const port = process.env.PORT || 8001

// CORS configuration FIRST
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    'https://flower-oasis.vercel.app',
    'https://flower-oasis-admin.vercel.app',
    'https://flower-oasis-admin.onrender.com',
    'https://flower-oasis-1.onrender.com'
];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(null, false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token']
}));

// Other middleware
app.use(express.json());

// Database connections
connectDB();
connectCloudinary();

// API endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Root endpoint
app.get('/', (req, res) => {
    res.send('API is running')
});

// ADD THIS: Health check endpoint
app.get('/api/health-check', (req, res) => {
    res.json({ 
        success: true, 
        message: 'Backend is running',
        timestamp: new Date().toISOString()
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});