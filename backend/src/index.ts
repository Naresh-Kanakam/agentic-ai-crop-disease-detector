// This is the main entry point for the backend server
// It sets up the Express server and connects to the MongoDB database
// and handles image uploads.
// File: backend/src/index.ts
// It also includes middleware for parsing JSON and handling CORS.
// It listens on port 5000 for incoming requests.
import express from 'express';
import cors from 'cors';
import uploadRoutes from './routes/upload';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api', uploadRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});