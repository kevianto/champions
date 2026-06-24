import { config } from '../config';
import { deviceStore } from '../models/deviceStore';
import { mqttService } from '../mqtt/mqttClient';
import { DeviceState } from '../types/device';

export class DeviceService {
  public async turnLedOn(): Promise<void> {
    await mqttService.publish(config.mqttLedTopic, 'ON', 1);
  }

  public async turnLedOff(): Promise<void> {
    await mqttService.publish(config.mqttLedTopic, 'OFF', 1);
  }

  public async turnFanOn(): Promise<void> {
    await mqttService.publish(config.mqttFanTopic, 'ON', 1);
  }

  public async turnFanOff(): Promise<void> {
    await mqttService.publish(config.mqttFanTopic, 'OFF', 1);
  }

  public getStatus(): DeviceState {
    return deviceStore.getState();
  }
}

export const deviceService = new DeviceService();
