import express from 'express';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';

// Connect to DB
connectDB();

const app = express();

// Middlewares
const corsOptions = {
  // origin: 'http://localhost:5173',
  origin: 'https://ecommerce-beta-by-abdullah.vercel.app',
  credentials: true, // allow credentials (cookies, headers, etc.)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
