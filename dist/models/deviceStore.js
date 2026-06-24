"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceStore = void 0;
class DeviceStore {
    state = {
        ledOn: false,
        fanOn: false,
    };
    getState() {
        return { ...this.state };
    }
    updateState(newState) {
        this.state = { ...this.state, ...newState };
    }
}
exports.deviceStore = new DeviceStore();
