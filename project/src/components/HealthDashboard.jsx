import { useNavigate } from "react-router-dom";
import { Activity, Flame, Trophy, Zap, Heart, Brain, Dumbbell, Droplets, ChevronRight, Star, Watch, Smartphone } from "lucide-react";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import StepTracker from "./StepTracker";
import { useWearable } from "../contexts/WearableContext";

export default function HealthDashboard({ metrics }) {
  const navigate = useNavigate();
  const { wearableData, provider } = useWearable();
  
  const isConnected = !!provider;

  if (!metrics) return (
    <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
    </div>
  );

  // --- DERIVED METRICS ---
  const TARGET_CALORIES = 2500;
  const TARGET_WATER = 2500; // ml
  const TARGET_STEPS = 10000;

  const calories = metrics.dailyCalories || 0;
  const calPercent = Math.min((calories / TARGET_CALORIES) * 100, 100);
  
  // Weekly water mock
  const weeklyHydration = [1200, 1800, 1500, 2200, 1900, 2500, metrics.dailyWater || 1350].map(val => 
      Math.min((val / TARGET_WATER) * 100, 100)
  );

  const steps = isConnected && wearableData?.steps ? wearableData.steps : 8432;
  const stepsPercent = Math.min((steps / TARGET_STEPS) * 100, 100);

  const quickActions = [
    { title: "Diet Plan", icon: Flame, color: "from-orange-400 to-red-500", path: "/dashboard/diet", desc: "View Meals" },
    { title: "Meal Tracker", icon: Activity, color: "from-emerald-400 to-teal-500", path: "/dashboard/tracker", desc: "Log Food" },
    { title: "Health Hub", icon: Heart, color: "from-rose-400 to-pink-500", path: "/dashboard/health-hub", desc: "Vitals" },
    { title: "Workout Hub", icon: Dumbbell, color: "from-blue-400 to-indigo-500", path: "/dashboard/workout", desc: "Train" },
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. DAILY OVERVIEW SECTION (Equal Height Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Calories (Circular) */}
          <Card className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col items-center justify-center p-6 border-white/10" variant="glass">
              <h3 className="text-sm font-bold text-dark-muted uppercase tracking-wider mb-4">Calories</h3>
              <div className="relative w-40 h-40 flex items-center justify-center">
                   <svg className="w-full h-full -rotate-90">
                       <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-dark-BG transition-colors duration-500" />
                       <circle 
                           cx="80" cy="80" r="70" 
                           stroke="currentColor" strokeWidth="12" fill="transparent" 
                           strokeDasharray={439.8} 
                           strokeDashoffset={439.8 - (calPercent / 100) * 439.8}
                           className="text-emerald-500 transition-all duration-1000 ease-out" 
                           strokeLinecap="round" 
                       />
                   </svg>
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                       <span className="text-3xl font-black text-dark-text">{calories}</span>
                       <span className="text-xs font-bold text-dark-muted">/ {TARGET_CALORIES}</span>
                   </div>
              </div>
              <p className="mt-4 text-xs font-medium text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full">
                  {Math.round(TARGET_CALORIES - calories)} kcal remaining
              </p>
          </Card>

          {/* Macros (Horizontal Bars) */}
          <Card className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-between p-6 border-white/10" variant="glass">
               <h3 className="text-sm font-bold text-dark-muted uppercase tracking-wider mb-4">Daily Macros</h3>
               <div className="space-y-6">
                   {[
                       { label: 'Protein', val: metrics.dailyProtein || 0, max: 150, color: 'bg-emerald-500' },
                       { label: 'Carbs', val: metrics.dailyCarbs || 0, max: 250, color: 'bg-blue-500' },
                       { label: 'Fats', val: metrics.dailyFat || 0, max: 70, color: 'bg-yellow-500' }
                   ].map((macro, i) => (
                       <div key={i}>
                           <div className="flex justify-between text-xs font-bold text-dark-muted mb-1.5">
                               <span>{macro.label}</span>
                               <span>{macro.val} / {macro.max}g</span>
                           </div>
                           <div className="h-2 w-full bg-dark-BG rounded-full overflow-hidden">
                               <div className={`h-full ${macro.color} rounded-full transition-all duration-700 ease-out`} style={{ width: `${Math.min((macro.val/macro.max)*100, 100)}%` }}></div>
                           </div>
                       </div>
                   ))}
               </div>
               <div className="mt-auto"></div>
          </Card>

          {/* Water Intake */}
          <Card className="col-span-1 flex flex-col justify-between p-6 border-white/10" variant="glass">
              <div className="flex justify-between items-start">
                   <h3 className="text-sm font-bold text-dark-muted uppercase tracking-wider">Hydration</h3>
                   <Droplets className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1 flex items-end gap-2 h-32 my-4">
                   {weeklyHydration.map((h, i) => (
                       <div key={i} className="flex-1 bg-dark-BG rounded-t-lg relative overflow-hidden group">
                           <div className="absolute bottom-0 w-full bg-blue-500 transition-all duration-500 group-hover:bg-blue-600 group-hover:h-full" style={{ height: `${h}%` }}></div>
                       </div>
                   ))}
              </div>
              <div className="flex justify-between items-end">
                   <div>
                       <div className="text-2xl font-black text-dark-text">{metrics.dailyWater || 1350}</div>
                       <div className="text-xs font-bold text-dark-muted">ml consumed</div>
                   </div>
                   <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20 text-[10px] px-2">Goal: {TARGET_WATER}</Badge>
              </div>
          </Card>
          
           {/* Activity / Steps */}
           <StepTracker className="col-span-1" initialSteps={steps} goal={TARGET_STEPS} />
      </div>

      {/* 2. QUICK ACTIONS ROW */}
      <h2 className="text-lg font-bold text-dark-text animate-fade-in delay-200">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, idx) => (
              <button 
                key={idx}
                onClick={() => navigate(action.path)}
                className={`group flex flex-col items-center justify-center p-6 bg-dark-card border border-white/10 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up`}
                style={{ animationDelay: `${(idx + 3) * 100}ms` }}
              >
                  <div className={`w-12 h-12 rounded-xl mb-3 flex items-center justify-center text-white bg-gradient-to-br ${action.color} shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      <action.icon className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-dark-text group-hover:text-emerald-600 transition-colors">{action.title}</span>
                  <span className="text-xs text-dark-muted mt-1">{action.desc}</span>
              </button>
          ))}
      </div>

      {/* 3. HEALTH INSIGHTS */}
      <div className="grid grid-cols-1 animate-fade-in-up delay-500">
          
          {/* Insights */}
          <Card className="p-6 border-white/10" variant="glass">
              <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-500/10 rounded-lg text-purple-600">
                      <Brain className="w-5 h-5 animate-pulse" />
                  </div>
                  <h3 className="font-bold text-dark-text">AI Health Insights</h3>
              </div>
              <div className="space-y-4">
                  <div className="flex gap-4 items-start p-4 rounded-xl bg-dark-BG border border-white/10 hover:border-emerald-500/30 transition-colors duration-300">
                      <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 animate-pulse"></div>
                      <div>
                          <p className="text-sm font-medium text-dark-text leading-relaxed">
                              You're maintaining a great calorie deficit this week! Try increasing your protein intake slightly to maximize muscle retention during your workouts.
                          </p>
                      </div>
                  </div>
                   <div className="flex gap-4 items-start p-4 rounded-xl bg-dark-BG border border-white/10 hover:border-yellow-500/30 transition-colors duration-300">
                      <div className="mt-1 w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0 animate-pulse"></div>
                      <div>
                          <p className="text-sm font-medium text-dark-text leading-relaxed">
                              Your hydration was a bit low yesterday. Aim for an extra glass of water this afternoon to stay on track.
                          </p>
                      </div>
                  </div>
              </div>
          </Card>
      </div>
    </div>
  );
}
