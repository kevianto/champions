import { Request, Response, NextFunction } from 'express';
import { deviceService } from '../services/deviceService';

export class DeviceController {
  public turnLedOn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await deviceService.turnLedOn();
      res.status(200).json({ message: 'LED turned on' });
    } catch (error) {
      next(error);
    }
  };

  public turnLedOff = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await deviceService.turnLedOff();
      res.status(200).json({ message: 'LED turned off' });
    } catch (error) {
      next(error);
    }
  };

  public turnFanOn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await deviceService.turnFanOn();
      res.status(200).json({ message: 'Fan turned on' });
    } catch (error) {
      next(error);
    }
  };

  public turnFanOff = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await deviceService.turnFanOff();
      res.status(200).json({ message: 'Fan turned off' });
    } catch (error) {
      next(error);
    }
  };

  public getStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const status = deviceService.getStatus();
      res.status(200).json(status);
    } catch (error) {
      next(error);
    }
  };
}

export const deviceController = new DeviceController();
