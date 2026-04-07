import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'messaging-app-backend',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
  ...(process.env.KAFKA_USERNAME && {
    ssl: { rejectUnauthorized: false },
    sasl: {
      mechanism: process.env.KAFKA_SASL_MECHANISM || 'plain',
      username: process.env.KAFKA_USERNAME,
      password: process.env.KAFKA_PASSWORD,
    },
  }),
});

const producer = kafka.producer();
// Create a separate consumer for background jobs
const consumer = kafka.consumer({ groupId: 'notification-group' });

let producerConnected = false;

export const connectProducer = async () => {
  if (producerConnected) return;
  try {
    const admin = kafka.admin();
    await admin.connect();
    await admin.createTopics({
      topics: [{ topic: 'chat-messages', numPartitions: 1 }],
      waitForLeaders: true,
    });
    console.log('Kafka Admin verified topics');
    await admin.disconnect();

    await producer.connect();
    producerConnected = true;
    console.log('Kafka Producer Connected');
  } catch (error) {
    console.error('Error connecting to Kafka Producer:', error);
  }
};

// Fire and forget publishing helper
export const publishMessageEvent = async (messageData) => {
  try {
    await connectProducer();
    await producer.send({
      topic: 'chat-messages',
      messages: [
        {
          key: String(messageData.channelId),
          value: JSON.stringify(messageData),
        },
      ],
    });
  } catch (error) {
    console.error('Error publishing to Kafka:', error);
  }
};

export const getKafkaConsumer = () => consumer;
export { kafka };
