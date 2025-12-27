const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Middleware to check if user is admin
// For now, we'll assume a "role" field or specific email list.
// In User Schema, we didn't add "role", but we can use email for now.
const ensureAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.email === process.env.ADMIN_EMAIL) {
        return next();
    }
    // Or if we added a role field
    if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
    }
    
    res.status(403).json({ message: "Access denied" });
};

router.get("/stats", ensureAdmin, adminController.getDashboardStats);
router.get("/logs", ensureAdmin, adminController.getAuditLogs);

module.exports = router;
