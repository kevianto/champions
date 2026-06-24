"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceService = exports.DeviceService = void 0;
const config_1 = require("../config");
const deviceStore_1 = require("../models/deviceStore");
const mqttClient_1 = require("../mqtt/mqttClient");
class DeviceService {
    async turnLedOn() {
        await mqttClient_1.mqttService.publish(config_1.config.mqttLedTopic, 'ON', 1);
    }
    async turnLedOff() {
        await mqttClient_1.mqttService.publish(config_1.config.mqttLedTopic, 'OFF', 1);
    }
    async turnFanOn() {
        await mqttClient_1.mqttService.publish(config_1.config.mqttFanTopic, 'ON', 1);
    }
    async turnFanOff() {
        await mqttClient_1.mqttService.publish(config_1.config.mqttFanTopic, 'OFF', 1);
    }
    getStatus() {
        return deviceStore_1.deviceStore.getState();
    }
}
exports.DeviceService = DeviceService;
exports.deviceService = new DeviceService();
