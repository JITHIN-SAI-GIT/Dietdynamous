const { Worker } = require('bullmq');
const geminiService = require('../services/geminiService');
const NotificationService = require('../services/notificationService');
const User = require('../models/User');

const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
};

// Worker for Notifications
const notificationWorker = new Worker('notifications', async job => {
  console.log(`Processing notification job ${job.id}:`, job.data);
  const { userId, type, title, message } = job.data;
  
  // Here we would integrate Email Service or Push Notification API
  // For now, we just save to DB (which is already done by Service usually, 
  // but if this is offloaded, we do it here).
  // Assuming the Service adds the job to SEND it externally.
  
  console.log(`[Simulated] Sending email/push to user ${userId}`);
  
}, { connection });

// Worker for Recommendations
const recommendationWorker = new Worker('recommendations', async job => {
    console.log(`Processing recommendation job ${job.id}:`, job.data);
    const { userId } = job.data;
    
    // Logic to fetch user data and ask AI for insight
    // This is a heavy task, perfect for background job
    try {
        const user = await User.findById(userId);
        if(!user) return;
        
        // Mocking history or fetching real one
        const history = []; // Fetch recent history...
        
        // Use GeminiService to analyze
        // Implementation TBD based on exact prompt needs
        console.log(`Analyzing data for user ${userId}`);
        
        await NotificationService.createNotification(
            userId, 
            "info", 
            "New Health Insight", 
            "We have analyzed your recent activity! Check your dashboard."
        );
        
    } catch (e) {
        console.error("Error generating recommendation", e);
    }

}, { connection });

module.exports = {
    notificationWorker,
    recommendationWorker
};
