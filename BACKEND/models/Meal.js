const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  foodName: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  mealType: { type: String, enum: ["breakfast", "lunch", "dinner", "snack"], default: "breakfast" },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Meal", MealSchema);
