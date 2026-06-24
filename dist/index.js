"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("./config");
const deviceRoutes_1 = __importDefault(require("./routes/deviceRoutes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const mqttClient_1 = require("./mqtt/mqttClient");
const app = (0, express_1.default)();
// Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
// Routes
app.use('/api/device', deviceRoutes_1.default);
// Health/Status check for the backend itself
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        mqttConnected: mqttClient_1.mqttService.isConnected()
    });
});
// 404 Route
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});
// Global Error Handler
app.use(errorHandler_1.errorHandler);
// Connect MQTT Client
mqttClient_1.mqttService.connect();
// Start Server
app.listen(config_1.config.port, () => {
    console.log(`[Server] Smart Home Backend running on port ${config_1.config.port}`);
});
