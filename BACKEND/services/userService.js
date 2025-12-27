const User = require("../models/User");

class UserService {
  /**
   * Update user profile with versioning (audit trail could be added here)
   */
  static async updateProfile(userId, data) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // Copy allow-listed fields
    const allowedFields = [
        "age", "gender", "height", "weight", "activityLevel", "goal",
        "locality", "profession", "medicalHistory", "profileCompleted"
    ];

    allowedFields.forEach(field => {
        if (data[field] !== undefined) {
            user[field] = data[field];
        }
    });

    if (data.preferences) {
        user.preferences = { ...user.preferences, ...data.preferences };
    }

    return await user.save();
  }

  static async getUserProfile(userId) {
      return await User.findById(userId).select("-hash -salt");
  }
}

module.exports = UserService;
