import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import lawyerRoutes from './routes/lawyerRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import videoRoutes from './routes/videoRoutes.js';

dotenv.config();

// ✅ Fix for `__dirname` in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors()); // Enable CORS
app.use(helmet()); // Secure HTTP headers
app.use(morgan('dev')); // Log HTTP requests

// ✅ Static uploads path (for serving uploaded files)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ API Routes
app.use('/api/lawyers', lawyerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/video', videoRoutes);

// ✅ Test Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

//
// 
// 
//  ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error(`Error connecting to MongoDB: ${error.message}`));






/*mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((error) => console.error(`Error connecting to MongoDB: ${error.message}`));*/

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
