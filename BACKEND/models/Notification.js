const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["info", "success", "warning", "error", "reminder", "system"], required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  data: { type: Object }, // Optional payload for navigation or details
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date } // Auto-delete optional
});

NotificationSchema.index({ userId: 1, isRead: 1 });
NotificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 30 }); // 30 days retention

module.exports = mongoose.model("Notification", NotificationSchema);
