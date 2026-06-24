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
    mqttBrokerUrl: process.env.MQTT_BROKER_URL || 'mqtt://broker.hivemq.com:1883',
    mqttClientId: process.env.MQTT_CLIENT_ID || 'smart-home-backend',
    mqttLedTopic: process.env.MQTT_LED_TOPIC || 'champions_e4t2/home/led',
    mqttFanTopic: process.env.MQTT_FAN_TOPIC || 'champions_e4t2/home/fan',
    mqttStatusTopic: process.env.MQTT_STATUS_TOPIC || 'champions_e4t2/home/status',
};
