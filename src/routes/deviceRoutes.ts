import { Router } from 'express';
import { deviceController } from '../controllers/deviceController';

const router = Router();

router.post('/led/on', deviceController.turnLedOn);
router.post('/led/off', deviceController.turnLedOff);
router.post('/fan/on', deviceController.turnFanOn);
router.post('/fan/off', deviceController.turnFanOff);
router.get('/status', deviceController.getStatus);

export default router;
