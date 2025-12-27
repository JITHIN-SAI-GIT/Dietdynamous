const User = require("../models/User");
const AuditLog = require("../models/AuditLog");

exports.getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeUsers = await User.countDocuments({ "security.lastLogin": { $gte: new Date(Date.now() - 24*60*60*1000) } });
        const premiumUsers = await User.countDocuments({ "subscription.plan": "pro" });
        
        res.json({
            users: { total: totalUsers, active: activeUsers, premium: premiumUsers },
            system: { status: "healthy", uptime: process.uptime() }
        });
    } catch (err) {
        res.status(500).json({ message: "Error fetching stats" });
    }
};

exports.getAuditLogs = async (req, res) => {
    try {
        const logs = await AuditLog.find().sort({ timestamp: -1 }).limit(100).populate("userId", "email username");
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: "Error fetching logs" });
    }
};
