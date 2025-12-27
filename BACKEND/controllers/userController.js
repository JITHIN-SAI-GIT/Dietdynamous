const userService = require("../services/userService");
const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    const user = await userService.getUserProfile(req.user._id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updatedUser = await userService.updateProfile(req.user._id, req.body);
    res.json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updatePreferences = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (req.body.theme) user.preferences.theme = req.body.theme;
        if (req.body.notifications) user.preferences.notifications = { ...user.preferences.notifications, ...req.body.notifications };
        if (req.body.language) user.preferences.language = req.body.language;
        
        await user.save();
        res.json({ message: "Preferences updated", preferences: user.preferences });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}
