const express = require("express");
const router = express.Router();

// Mock Cloud Data Store
// In a real app, this would be fetched from Fitbit/Garmin APIs using the stored access_token
const MOCK_CLOUD_DATA = {
    fitbit: { steps: 8432, heartRate: 72, calories: 1240, sleep: "7h 42m", battery: 85 },
    garmin: { steps: 9150, heartRate: 68, calories: 1450, sleep: "8h 12m", battery: 92 },
    apple:  { steps: 6720, heartRate: 75, calories: 980,  sleep: "6h 50m", battery: 45 },
    samsung:{ steps: 7890, heartRate: 78, calories: 1100, sleep: "7h 15m", battery: 60 },
    xiaomi: { steps: 5600, heartRate: 80, calories: 850,  sleep: "6h 30m", battery: 78 },
};

// @route   POST /api/wearables/auth/:provider
// @desc    Simulate initiating OAuth 2.0 flow
// @access  Private (Session)
router.post("/auth/:provider", (req, res) => {
    const { provider } = req.params;
    
    // In production: Generate OAuth URL (e.g., https://www.fitbit.com/oauth2/authorize?...)
    // For this architecture demo, we simulate the handshake
    
    // Validation
    if (!['fitbit', 'garmin', 'apple', 'samsung', 'xiaomi'].includes(provider)) {
        return res.status(400).json({ msg: "Unsupported provider" });
    }

    // Simulate "Redirect" URL
    const authUrl = `https://api.${provider}.com/oauth/authorize?client_id=DIET_DYNAMOS&response_type=code`;
    
    // We return success immediately for the simulation, 
    // but in real life the frontend would window.location.href = authUrl
    res.json({ 
        success: true, 
        authUrl, 
        msg: `Redirecting to ${provider} OAuth...` 
    });
});

// @route   POST /api/wearables/callback
// @desc    Simulate OAuth Callback & Token Exchange
router.post("/callback", (req, res) => {
    const { provider, code } = req.body;
    
    if (!provider) return res.status(400).json({ msg: "Provider required" });

    // Simulate Token Exchange
    const accessToken = `access_token_${provider}_${Date.now()}`;
    const refreshToken = `refresh_token_${provider}_${Date.now()}`;

    // Store in Session (or Database in real app)
    req.session.wearable = {
        provider,
        accessToken,
        connectedAt: new Date()
    };

    res.json({ 
        success: true, 
        provider, 
        msg: "Secure Connection Established" 
    });
});

// @route   GET /api/wearables/data
// @desc    Fetch synced health data from the connected provider
router.get("/data", (req, res) => {
    const connection = req.session.wearable;

    if (!connection || !connection.provider) {
        return res.status(401).json({ msg: "No wearable connected" });
    }

    const providerData = MOCK_CLOUD_DATA[connection.provider] || MOCK_CLOUD_DATA['fitbit'];

    const liveData = {
        ...providerData
    };

    res.json({
        success: true,
        provider: connection.provider,
        data: liveData,
        lastSync: new Date()
    });
});

// @route   POST /api/wearables/disconnect
// @desc    Revoke tokens and disconnect
router.post("/disconnect", (req, res) => {
    req.session.wearable = null;
    res.json({ success: true, msg: "Disconnected successfully" });
});

module.exports = router;
