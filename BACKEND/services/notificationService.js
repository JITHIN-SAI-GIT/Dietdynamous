const Notification = require("../models/Notification");

class NotificationService {
  
  static async createNotification(userId, type, title, message, data = {}) {
    try {
      const notification = new Notification({
        userId,
        type,
        title,
        message,
        data,
      });
      await notification.save();
      
      // TODO: Emit socket event here
      // if (global.io) {
      //   global.io.to(userId.toString()).emit("notification", notification);
      // }
      
      return notification;
    } catch (error) {
      console.error("Error creating notification:", error);
    }
  }

  static async getUserNotifications(userId) {
    return await Notification.find({ userId }).sort({ createdAt: -1 }).limit(50);
  }

  static async markAsRead(notificationId, userId) {
      return await Notification.findOneAndUpdate(
          { _id: notificationId, userId },
          { isRead: true },
          { new: true }
      );
  }
}

module.exports = NotificationService;
