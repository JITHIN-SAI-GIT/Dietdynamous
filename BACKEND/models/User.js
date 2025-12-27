const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  googleId: { type: String, unique: true, sparse: true },
  
  // Extended Profile
  age: { type: Number },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  height: { type: Number }, // cm
  weight: { type: Number }, // kg
  activityLevel: { type: String, enum: ["Low", "Moderate", "High"] },
  goal: { type: String, enum: ["weight_loss", "weight_gain", "muscle_building", "maintain_health"] },
  
  profileCompleted: { type: Boolean, default: false },

  locality: { type: String },
  profession: { type: String },
  medicalHistory: [{ type: String }],
  
  // Feature 1: Preferences & Smart Profile
  preferences: {
    theme: { type: String, default: "light" },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      sms: { type: Boolean, default: false }
    },
    language: { type: String, default: "en" }
  },
  
  // Feature 6: Security & Compliance
  security: {
    lastLogin: { type: Date },
    lastIp: { type: String },
    loginCount: { type: Number, default: 0 },
    devices: [{
      deviceId: String,
      userAgent: String,
      lastActive: Date
    }]
  },
  
  // Feature: Subscription (for future proofing)
  subscription: {
    plan: { type: String, default: "free", enum: ["free", "pro", "enterprise"] },
    status: { type: String, default: "active" },
    startDate: { type: Date },
    endDate: { type: Date }
  },

  // Gamification
  gamification: {
    points: { type: Number, default: 0 },
    badges: [{ type: String }], // e.g. "Early Bird", "Streak Master"
    streak: { type: Number, default: 0 },
    level: { type: Number, default: 1 }
  },
  
  // Wearables
  wearables: {
    connected: { type: Boolean, default: false },
    deviceName: { type: String }
  }
});

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});

module.exports =
  mongoose.models.User || mongoose.model("User", UserSchema);
