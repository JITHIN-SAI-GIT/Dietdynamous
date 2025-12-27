const passport = require("passport");
const User = require("../models/User");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(409).json({ message: "Email already registered" });
      }
      return res.status(409).json({ message: "User exists" });
    }

    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    // Auto Login after Signup
    req.login(registeredUser, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Signup successful but login failed" });
      }
      
      return res.status(201).json({ 
        message: "Signup successful", 
        user: {
            id: registeredUser._id,
            email: registeredUser.email,
            username: registeredUser.username,
            profileCompleted: false,
            preferences: registeredUser.preferences
        }
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    req.logIn(user, async (err) => {
      if (err) return next(err);

      // Feature 6: Security - Log Login
      // We will perform this asynchronously to not block the response
      try {
        user.security.lastLogin = new Date();
        user.security.lastIp = req.ip;
        user.security.loginCount += 1;
        user.security.devices.push({
            deviceId: req.headers['user-agent'], // Simple fingerprint for now
            userAgent: req.headers['user-agent'],
            lastActive: new Date()
        });
        await user.save();
      } catch (e) {
          console.error("Error updating user security stats", e);
      }

      return res.json({
        message: "Login successful",
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          profileCompleted: user.profileCompleted || false,
          preferences: user.preferences
        },
      });
    });
  })(req, res, next);
};

exports.checkAuth = (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ user: req.user });
  }
  res.status(401).json({ message: "Not authenticated" });
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out" });
  });
};
