import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "./services/api";

import LandingPage from "./components/LandingPage";
import ProfileSetup from "./components/ProfileSetup";
import HealthDashboard from "./components/HealthDashboard";
import FoodSearch from "./components/FoodSearch";
import DietPlan from "./components/DietPlan";
import PvPDuelArena from "./components/PvPDuelArena";
// ... imports
import MealTracker from "./components/MealTracker";
import FoodFacts from "./components/FoodFacts";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserProfile from "./components/UserProfile";
import Leaderboard from "./components/Leaderboard";
import WorkoutHub from "./components/WorkoutHub";
import Explore from "./components/Explore";
import RPG from "./components/RPG";
import Wearables from "./components/Wearables";
import HealthHub from "./components/HealthHub";

import DashboardLayout from "./components/DashboardLayout";
import OfflineIndicator from "./components/OfflineIndicator";
import AdminDashboard from "./pages/AdminDashboard";
import Themes from "./components/Themes";

import NutritionChatbot from "./components/NutritionChatbot";
import { WearableProvider } from "./contexts/WearableContext";
import { ThemeProvider } from "./contexts/ThemeContext";

// Helper/Mock Data
import { calculateHealthMetrics } from "./utils/healthCalculations";
import { generateDietPlan } from "./data/mockData";

export default function App() {
  const [userData, setUserData] = useState(null);
  const [dietPlan, setDietPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/auth/check-auth");
        if (data.user) {
           setUserData(data.user);
           
           if(data.user.profileCompleted) {
             const metrics = calculateHealthMetrics(data.user);
             const plan = generateDietPlan({
                goal: data.user.goal,
                dailyCalories: metrics.dailyCalories,
                dailyProtein: metrics.dailyProtein,
             });
             setDietPlan(plan);
           }
        }
      } catch (e) {
        console.log("Not logged in");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleProfileComplete = (data) => {
    const newUserData = {
      ...userData, // Merge with existing auth data (id, email, etc.)
      ...data,    // Add profile data
      profileCompleted: true
    };
    
    setUserData(newUserData);
    
    // Calculate Plan Immediately
    const metrics = calculateHealthMetrics(newUserData);
    const plan = generateDietPlan({
      goal: newUserData.goal,
      dailyCalories: metrics.dailyCalories,
      dailyProtein: metrics.dailyProtein,
    });
    setDietPlan(plan);
  };

  const metrics = (userData && userData.profileCompleted) ? calculateHealthMetrics(userData) : null;

  if (loading) {
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
  }

  return (
    <ThemeProvider>
    <WearableProvider isAuthenticated={!!userData}>
    <BrowserRouter>
      <Routes>
        {/* PUBLIC / ENTRY ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login setUserData={setUserData} />} />
        <Route path="/signup" element={<Signup setUserData={setUserData} />} />

        {/* ONBOARDING */}
        <Route
          path="/profile"
          element={userData ? <ProfileSetup onComplete={handleProfileComplete} /> : <Navigate to="/login" />}
        />

        {/* PROTECTED DASHBOARD ROUTES */}
        <Route
          path="/dashboard/health-hub"
          element={
            userData ? (
              <DashboardLayout userData={userData}>
                <HealthHub />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            userData ? (
              <DashboardLayout userData={userData}>
                <HealthDashboard metrics={metrics || {}} />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        
        <Route
          path="/dashboard/leaderboard"
          element={
            userData ? (
              <DashboardLayout userData={userData}>
                <Leaderboard />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/workout"
          element={
            userData ? (
              <DashboardLayout userData={userData}>
                <WorkoutHub />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        
        <Route
          path="/dashboard/profile"
          element={
            userData ? (
              <DashboardLayout userData={userData}>
                <UserProfile userData={userData} onUpdate={setUserData} />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/diet"
          element={
            userData ? (
              <DashboardLayout userData={userData}>
                <DietPlan plan={dietPlan} />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />



        <Route
          path="/dashboard/tracker"
          element={
            userData ? (
              <DashboardLayout userData={userData}>
                <MealTracker
                  userProfileId={userData.id}
                  dailyCalories={metrics?.dailyCalories || 2000}
                  dailyProtein={metrics?.dailyProtein || 50}
                />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/rpg"
          element={
            userData ? (
              <DashboardLayout userData={userData}>
                <RPG streak={userData.gamification?.streak || 0} />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/explore"
          element={
            userData ? (
              <DashboardLayout userData={userData}>
                <Explore streak={userData.gamification?.streak || 12} />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/wearables"
          element={
            userData ? (
              <DashboardLayout userData={userData}>
                <Wearables />
              </DashboardLayout>
            ) : (
               <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/duel"
          element={
            userData ? (
              <DashboardLayout userData={userData}>
                <PvPDuelArena />
              </DashboardLayout>
            ) : (
               <Navigate to="/login" />
            )
          }
        />


        
        <Route
          path="/dashboard/themes"
          element={
            userData ? (
                <DashboardLayout userData={userData}>
                    <Themes />
                </DashboardLayout>
            ) : (
                <Navigate to="/login" />
            )
          }
        />
        
        <Route
          path="/dashboard/chat"
          element={
            userData ? (
              <DashboardLayout userData={userData}>
                <NutritionChatbot />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/facts"
          element={
            userData ? (
              <DashboardLayout userData={userData}>
                <FoodFacts />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* ADMIN ROUTE */}
        <Route
          path="/admin"
          element={
            userData ? (
              <DashboardLayout userData={userData}>
                <AdminDashboard />
              </DashboardLayout>
            ) : (
               <Navigate to="/login" />
            )
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <OfflineIndicator />
    </BrowserRouter>
    </WearableProvider>
    </ThemeProvider>
  );
}
