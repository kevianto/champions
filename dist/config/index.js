"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: parseInt(process.env.PORT || '3000', 10),
    mqttBrokerUrl: process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883',
    mqttClientId: process.env.MQTT_CLIENT_ID || 'smart-home-backend',
    mqttLedTopic: 'home/led',
    mqttFanTopic: 'home/fan',
    mqttStatusTopic: 'home/status',
};
