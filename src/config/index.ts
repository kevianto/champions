import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  mqttBrokerUrl: process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883',
  mqttClientId: process.env.MQTT_CLIENT_ID || 'smart-home-backend',
  mqttLedTopic: 'home/led',
  mqttFanTopic: 'home/fan',
  mqttStatusTopic: 'home/status',
};
