import { DeviceState } from '../types/device';

class DeviceStore {
  private state: DeviceState = {
    ledOn: false,
    fanOn: false,
  };

  public getState(): DeviceState {
    return { ...this.state };
  }

  public updateState(newState: Partial<DeviceState>): void {
    this.state = { ...this.state, ...newState };
  }
}

export const deviceStore = new DeviceStore();
