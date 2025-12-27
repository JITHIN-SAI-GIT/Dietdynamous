const mongoose = require("mongoose");

const AuditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: { type: String, required: true }, // e.g., "LOGIN", "UPDATE_PROFILE", "DELETE_ACCOUNT"
  details: { type: Object },
  ip: { type: String },
  userAgent: { type: String },
  deviceInfo: { type: Object },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AuditLog", AuditLogSchema);
