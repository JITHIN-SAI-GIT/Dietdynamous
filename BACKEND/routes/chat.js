const express = require("express");
const router = express.Router();
const geminiService = require("../services/geminiService");
const WeightHistory = require("../models/WeightHistory");

/* ================= CHAT MESSAGE ================= */
router.post("/message", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const { text } = req.body;
  const user = req.user;

  try {
    // 1. Fetch Context (Weight History)
    const history = await WeightHistory.find({ userId: user._id })
      .sort({ date: -1 })
      .limit(5);

    // 2. Call AI Service
    const botResponse = await geminiService.generateResponse(user, history, text);

    res.json({ response: botResponse });

  } catch (err) {
    console.error("Chat Route Error:", err);
    
    // Check for Google API specific errors (handy for debugging)
    if (err.message && (err.message.includes("403") || err.message.includes("SERVICE_DISABLED"))) {
       return res.status(503).json({ 
         message: "Google Gemini API is not enabled for this project.",
         response: "My brain is asleep! Please enable the 'Generative Language API' in your Google Cloud Console."
       });
    }

    if (err.message && (err.message.includes("404") || err.message.includes("not found"))) {
       return res.status(503).json({ 
         message: "AI Model not found or API not enabled.",
         response: "My brain is offline right now! (Model 404 Error)"
       });
    }

    res.status(500).json({ 
      message: "AI Error", 
      response: "I'm having a bit of a headache! Please try again later."
    });
  }
});

module.exports = router;
