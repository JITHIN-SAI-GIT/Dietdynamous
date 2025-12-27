const { Queue } = require('bullmq');

// Redis configuration - support REDIS_URL or host/port
const connection = process.env.REDIS_URL 
  ? { url: process.env.REDIS_URL }
  : {
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
    };

// Define Queues
const notificationQueue = new Queue('notifications', { connection });
const recommendationQueue = new Queue('recommendations', { connection });

// Helper to add jobs safely
const addJob = async (queue, name, data, opts) => {
    try {
        await queue.add(name, data, opts);
        console.log(`Job added to ${queue.name}: ${name}`);
    } catch (e) {
        console.error(`Failed to add job to ${queue.name}. Is Redis running?`, e.message);
    }
};

module.exports = {
  notificationQueue,
  recommendationQueue,
  addJob
};
