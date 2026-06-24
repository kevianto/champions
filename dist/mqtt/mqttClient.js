"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mqttService = void 0;
const mqtt_1 = __importDefault(require("mqtt"));
const config_1 = require("../config");
const deviceStore_1 = require("../models/deviceStore");
class MQTTService {
    client = null;
    connect() {
        console.log(`[MQTT] Connecting to broker at ${config_1.config.mqttBrokerUrl}...`);
        this.client = mqtt_1.default.connect(config_1.config.mqttBrokerUrl, {
            clientId: config_1.config.mqttClientId,
            clean: true,
            connectTimeout: 5000,
            reconnectPeriod: 5000,
        });
        this.client.on('connect', () => {
            console.log(`[MQTT] Connected to broker successfully.`);
            // Subscribe to status topic with QoS 1
            this.client?.subscribe(config_1.config.mqttStatusTopic, { qos: 1 }, (err) => {
                if (err) {
                    console.error(`[MQTT] Subscription error for topic ${config_1.config.mqttStatusTopic}:`, err);
                }
                else {
                    console.log(`[MQTT] Subscribed to topic: ${config_1.config.mqttStatusTopic}`);
                }
            });
        });
        this.client.on('message', (topic, message) => {
            console.log(`[MQTT] Received message on topic [${topic}]: ${message.toString()}`);
            if (topic === config_1.config.mqttStatusTopic) {
                try {
                    const parsed = JSON.parse(message.toString());
                    const update = {};
                    if (parsed && typeof parsed === 'object') {
                        if (typeof parsed.ledOn === 'boolean') {
                            update.ledOn = parsed.ledOn;
                        }
                        if (typeof parsed.fanOn === 'boolean') {
                            update.fanOn = parsed.fanOn;
                        }
                        deviceStore_1.deviceStore.updateState(update);
                        console.log(`[MQTT] Updated state from status topic to:`, deviceStore_1.deviceStore.getState());
                    }
                }
                catch (e) {
                    console.error(`[MQTT] Failed to parse status message:`, message.toString(), e);
                }
            }
        });
        this.client.on('error', (error) => {
            console.error('[MQTT] Connection error:', error);
        });
        this.client.on('close', () => {
            console.warn('[MQTT] Connection closed.');
        });
        this.client.on('reconnect', () => {
            console.log('[MQTT] Attempting to reconnect to MQTT broker...');
        });
    }
    publish(topic, message, qos = 1) {
        return new Promise((resolve, reject) => {
            if (!this.client || !this.client.connected) {
                console.error(`[MQTT] Cannot publish, client is not connected.`);
                return reject(new Error('MQTT client not connected'));
            }
            this.client.publish(topic, message, { qos }, (err) => {
                if (err) {
                    console.error(`[MQTT] Publish error on topic ${topic}:`, err);
                    return reject(err);
                }
                console.log(`[MQTT] Published [${message}] to [${topic}] with QoS ${qos}`);
                resolve();
            });
        });
    }
    isConnected() {
        return this.client !== null && this.client.connected;
    }
}
exports.mqttService = new MQTTService();
