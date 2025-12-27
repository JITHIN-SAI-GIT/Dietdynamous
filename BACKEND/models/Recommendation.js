const mongoose = require("mongoose");

const RecommendationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String, enum: ["nutrition", "workout", "sleep", "hydration", "wellbeing"], required: true },
  insight: { type: String, required: true },
  confidenceScore: { type: Number, min: 0, max: 1 },
  source: { type: String, default: "AI" }, // "AI" or "Rules"
  isActioned: { type: Boolean, default: false },
  feedback: { type: String, enum: ["helpful", "not_helpful", "dismissed"] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Recommendation", RecommendationSchema);
