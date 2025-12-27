const passport = require("passport");
const User = require("../models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = () => {
  passport.use(User.createStrategy());

  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.BACKEND_URL ? `${process.env.BACKEND_URL}/api/auth/google/callback` : "http://localhost:5000/api/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log("Google Strategy Callback Entry");
      try {
        console.log("Google Strategy: Profile received", profile.id);
        // Check if user exists by googleId or email
        let user = await User.findOne({ 
            $or: [
                { googleId: profile.id }, 
                { email: profile.emails[0].value }
            ] 
        });

        if (!user) {
          console.log("Google Strategy: creating new user");
          // Create new user
          user = await User.create({
            username: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            profileCompleted: false
          });
        } else if (!user.googleId) {
             console.log("Google Strategy: Linking existing account");
             // Link existing account
             user.googleId = profile.id;
             await user.save();
        }

        console.log("Google Strategy: User found/created", user._id);
        return cb(null, user);
      } catch (err) {
        console.error("Google Strategy Error:", err);
        return cb(err, null);
      }
    }
  ));

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
};
