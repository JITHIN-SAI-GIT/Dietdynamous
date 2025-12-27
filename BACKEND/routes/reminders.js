const express = require("express");
const router = express.Router();

// In-Memory Store (or DB in full app)
let userReminders = [
    { id: 1, type: "Water", label: "Hydration Check", time: "Every 2 hrs", active: true },
    { id: 2, type: "Meal", label: "Lunch Reminder", time: "13:00", active: true },
    { id: 3, type: "Workout", label: "Evening Run", time: "18:00", active: false },
    { id: 4, type: "Sleep", label: "Wind Down", time: "22:30", active: true },
];

// @route   GET /api/reminders
// @desc    Get all reminders
router.get("/", (req, res) => {
    res.json(userReminders);
});

// @route   POST /api/reminders
// @desc    Update reminders & Schedule Push Notifications
router.post("/", (req, res) => {
    const { reminders } = req.body;
    
    // Update Store
    userReminders = reminders;

    // Simulate Scheduling Push Notifications via FCM/APNs
    console.log("------------------------------------------------");
    console.log(" [PUSH NOTIFICATION SERVICE] Scheduling Alerts: ");
    userReminders.forEach(r => {
        if (r.active) {
            console.log(`  -> Scheduled '${r.label}' (${r.type}) at ${r.time} to Mobile App`);
        }
    });
    console.log("------------------------------------------------");

    res.json({ 
        success: true, 
        msg: "Reminders synced to mobile app",
        reminders: userReminders 
    });
});

module.exports = router;
