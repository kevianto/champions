import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config';
import deviceRoutes from './routes/deviceRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { mqttService } from './mqtt/mqttClient';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/device', deviceRoutes);

// Health/Status check for the backend itself
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    mqttConnected: mqttService.isConnected()
  });
});

// 404 Route
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Global Error Handler
app.use(errorHandler);

// Connect MQTT Client
mqttService.connect();

// Start Server
app.listen(config.port, () => {
  console.log(`[Server] Smart Home Backend running on port ${config.port}`);
});
