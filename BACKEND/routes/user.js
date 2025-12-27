const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// ALL ROUTES HERE REQUIRE AUTHENTICATION
// We should add a middleware verify here effectively
// Assuming app.use("/api/user", verifyToken, ...) or similar is used in index.js, 
// OR we add middleware to each route. 
// Existing code used CheckAuth inside routes or passport middleware. 
// We will assume `req.isAuthenticated()` check is done or we add middleware.

const ensureAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorized" });
};

router.get("/profile", ensureAuth, userController.getProfile);
router.put("/profile", ensureAuth, userController.updateProfile);
router.put("/preferences", ensureAuth, userController.updatePreferences);

module.exports = router;
