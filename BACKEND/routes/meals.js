const express = require("express");
const Meal = require("../models/Meal");
const router = express.Router();

// Helper to ensure auth
const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Not authorized" });
};

/* ================= GET TODAY'S MEALS ================= */
router.get("/today", ensureAuth, async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const meals = await Meal.find({
      userId: req.user._id,
      date: { $gte: startOfDay, $lte: endOfDay }
    }).sort({ date: 1 });

    res.json(meals);
  } catch (err) {
    console.error("Fetch Meals Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================= ADD MEAL ================= */
router.post("/", ensureAuth, async (req, res) => {
  try {
    const { foodName, calories, protein, mealType } = req.body;

    const newMeal = await Meal.create({
      userId: req.user._id,
      foodName,
      calories,
      protein,
      mealType
    });

    res.status(201).json(newMeal);
  } catch (err) {
    console.error("Add Meal Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================= DELETE MEAL ================= */
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    const meal = await Meal.findOne({ _id: req.params.id, userId: req.user._id });
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    await Meal.findByIdAndDelete(req.params.id);
    res.json({ message: "Meal deleted" });
  } catch (err) {
    console.error("Delete Meal Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
