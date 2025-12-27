const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");

/* ================= SIGNUP ================= */
router.post("/signup", authController.signup);

/* ================= LOGIN ================= */
router.post("/login", authController.login);

/* ================= GOOGLE AUTH ================= */
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", 
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect to dashboard
    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
    res.redirect(`${clientUrl}/dashboard`);
  }
);

/* ================= CHECK AUTH ================= */
router.get("/check-auth", authController.checkAuth);



/* ================= LOGOUT ================= */
router.post("/logout", authController.logout);

module.exports = router;
