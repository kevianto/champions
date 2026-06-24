"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceController = exports.DeviceController = void 0;
const deviceService_1 = require("../services/deviceService");
class DeviceController {
    turnLedOn = async (req, res, next) => {
        try {
            await deviceService_1.deviceService.turnLedOn();
            res.status(200).json({ message: 'LED turned on' });
        }
        catch (error) {
            next(error);
        }
    };
    turnLedOff = async (req, res, next) => {
        try {
            await deviceService_1.deviceService.turnLedOff();
            res.status(200).json({ message: 'LED turned off' });
        }
        catch (error) {
            next(error);
        }
    };
    turnFanOn = async (req, res, next) => {
        try {
            await deviceService_1.deviceService.turnFanOn();
            res.status(200).json({ message: 'Fan turned on' });
        }
        catch (error) {
            next(error);
        }
    };
    turnFanOff = async (req, res, next) => {
        try {
            await deviceService_1.deviceService.turnFanOff();
            res.status(200).json({ message: 'Fan turned off' });
        }
        catch (error) {
            next(error);
        }
    };
    getStatus = async (req, res, next) => {
        try {
            const status = deviceService_1.deviceService.getStatus();
            res.status(200).json(status);
        }
        catch (error) {
            next(error);
        }
    };
}
exports.DeviceController = DeviceController;
exports.deviceController = new DeviceController();
