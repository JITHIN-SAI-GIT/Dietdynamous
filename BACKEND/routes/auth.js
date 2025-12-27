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
  (req, res, next) => {
    passport.authenticate("google", { failureRedirect: "/login" }, (err, user, info) => {
      if (err) {
        console.error("Passport Authenticate Error:", err);
        return res.redirect("/login?error=auth_failed");
      }
      if (!user) {
        console.error("Passport Authenticate Failed: No user found");
        return res.redirect("/login?error=no_user");
      }
      req.logIn(user, (err) => {
        if (err) {
          console.error("Req.logIn Error:", err);
          return res.redirect("/login?error=login_error");
        }
        // Successful authentication, redirect to dashboard
        const clientUrl = process.env.CLIENT_URL || process.env.FRONTEND_URL || "http://localhost:5173";
        console.log("Redirecting to client:", clientUrl);
        res.redirect(`${clientUrl}/dashboard`);
      });
    })(req, res, next);
  }
);

/* ================= CHECK AUTH ================= */
router.get("/check-auth", authController.checkAuth);



/* ================= LOGOUT ================= */
router.post("/logout", authController.logout);

module.exports = router;
