import mqtt, { MqttClient } from 'mqtt';
import { config } from '../config';
import { deviceStore } from '../models/deviceStore';

class MQTTService {
  private client: MqttClient | null = null;

  public connect(): void {
    console.log(`[MQTT] Connecting to broker at ${config.mqttBrokerUrl}...`);
    
    this.client = mqtt.connect(config.mqttBrokerUrl, {
      clientId: config.mqttClientId,
      clean: true,
      connectTimeout: 5000,
      reconnectPeriod: 5000,
    });

    this.client.on('connect', () => {
      console.log(`[MQTT] Connected to broker successfully.`);
      
      // Subscribe to status topic with QoS 1
      this.client?.subscribe(config.mqttStatusTopic, { qos: 1 }, (err) => {
        if (err) {
          console.error(`[MQTT] Subscription error for topic ${config.mqttStatusTopic}:`, err);
        } else {
          console.log(`[MQTT] Subscribed to topic: ${config.mqttStatusTopic}`);
        }
      });
    });

    this.client.on('message', (topic, message) => {
      console.log(`[MQTT] Received message on topic [${topic}]: ${message.toString()}`);
      if (topic === config.mqttStatusTopic) {
        try {
          const parsed = JSON.parse(message.toString());
          const update: { ledOn?: boolean; fanOn?: boolean } = {};
          if (parsed && typeof parsed === 'object') {
            if (typeof parsed.ledOn === 'boolean') {
              update.ledOn = parsed.ledOn;
            }
            if (typeof parsed.fanOn === 'boolean') {
              update.fanOn = parsed.fanOn;
            }
            deviceStore.updateState(update);
            console.log(`[MQTT] Updated state from status topic to:`, deviceStore.getState());
          }
        } catch (e) {
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

  public publish(topic: string, message: string, qos: 0 | 1 | 2 = 1): Promise<void> {
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

  public isConnected(): boolean {
    return this.client !== null && this.client.connected;
  }
}

export const mqttService = new MQTTService();
