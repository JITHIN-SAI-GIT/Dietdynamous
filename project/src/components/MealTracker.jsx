import { useState, useEffect } from "react";
import { Plus, Trash2, TrendingUp, CheckCircle, Apple, Coffee, Moon, Sun, Search, Utensils, Activity } from "lucide-react";
import api from "../services/api";
import { searchFood } from "../data/mockData";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Badge from "./ui/Badge";

export default function MealTracker({
  userProfileId,
  startDailyCalories,
  startDailyProtein, // Assuming these props passed from parent, or we fetch them
}) {
  const [todayMeals, setTodayMeals] = useState([]);
  const [consumed, setConsumed] = useState({ calories: 0, protein: 0 });
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fallback defaults if props are missing
  const dailyCalories = startDailyCalories || 2000;
  const dailyProtein = startDailyProtein || 150;

  useEffect(() => {
    // In a real app, fetch meals from backend
    // loadMeals();
    // For now, empty or mock
    setTodayMeals([
        { id: 101, name: "Oatmeal & Berries", calories: 350, protein: 12, time: "08:30 AM", type: "breakfast" },
        { id: 102, name: "Grilled Chicken Salad", calories: 450, protein: 45, time: "01:00 PM", type: "lunch" },
    ]);
  }, [userProfileId]);

  useEffect(() => {
    calculateTotals(todayMeals);
  }, [todayMeals]);

  const calculateTotals = (meals) => {
    const totalCal = meals.reduce((acc, curr) => acc + curr.calories, 0);
    const totalProt = meals.reduce((acc, curr) => acc + curr.protein, 0);
    setConsumed({ calories: totalCal, protein: totalProt });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    
    // Simulate API search
    setTimeout(() => {
        const found = searchFood(query);
        setResults(found);
        setLoading(false);
    }, 600);
  };

  const addMeal = (item) => {
    const newMeal = { ...item, id: Date.now(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }; 
    const updatedMeals = [...todayMeals, newMeal];
    setTodayMeals(updatedMeals);
    setResults([]); // clear search
    setQuery("");
  };

  const removeMeal = (id) => {
      const updatedMeals = todayMeals.filter(m => m.id !== id);
      setTodayMeals(updatedMeals);
  }

  const getMealIcon = (type) => {
      if (type?.includes('breakfast')) return Sun;
      if (type?.includes('lunch')) return Sun; 
      if (type?.includes('dinner')) return Moon;
      return Coffee; 
  }

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in-up delay-100">
        <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-200">
                 <Activity className="w-6 h-6" />
             </div>
             <div>
                 <h1 className="text-3xl font-bold text-slate-800">Daily Tracker</h1>
                 <p className="text-slate-500">Log your meals and hit your targets.</p>
             </div>
        </div>
      </div>

      {/* STATS OVERVIEW */}
      <div className="grid md:grid-cols-2 gap-6 animate-fade-in-up delay-200">
           <ProgressCard 
              title="Calories" 
              current={consumed.calories} 
              target={dailyCalories} 
              percent={Math.min((consumed.calories / dailyCalories) * 100, 100)}
              color="text-orange-500"
              barColor="bg-orange-500"
              bgColor="bg-orange-50"
              borderColor="border-orange-200"
              icon={TrendingUp}
              met={consumed.calories >= dailyCalories}
           />
           <ProgressCard 
              title="Protein" 
              current={consumed.protein} 
              target={dailyProtein} 
              percent={Math.min((consumed.protein / dailyProtein) * 100, 100)}
              color="text-emerald-500"
              barColor="bg-emerald-500"
              bgColor="bg-emerald-50"
              borderColor="border-emerald-200"
              unit="g"
              icon={Utensils}
              met={consumed.protein >= dailyProtein}
           />
      </div>

      {/* ADD MEAL SECTION */}
      <Card variant="solid" className="bg-white border-slate-200 shadow-xl relative z-10 overflow-visible animate-fade-in-up delay-300">
          <div className="p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-emerald-500" /> Add a Meal
              </h3>
          </div>
          <div className="p-6 space-y-6">
              <form onSubmit={handleSearch} className="flex gap-4">
                  <Input 
                      value={query} 
                      onChange={(e) => setQuery(e.target.value)} 
                      placeholder="Search food (e.g. Greek Yogurt, Chicken Breast)..." 
                      className="flex-1 bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400"
                      icon={Search}
                  />
                  <Button type="submit" isLoading={loading} className="px-8 shadow-lg shadow-emerald-500/20">
                      Search
                  </Button>
              </form>

              {/* SEARCH RESULTS */}
              {results.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-4 animate-slide-up">
                      {results.map((item) => (
                          <div key={item.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center hover:bg-emerald-50 transition-colors group">
                               <div className="flex items-center gap-3">
                                   <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-400 shadow-sm border border-slate-100">
                                       <Utensils size={18} />
                                   </div>
                                   <div>
                                       <div className="font-bold text-slate-700">{item.name}</div>
                                       <div className="text-xs text-slate-500 font-medium">{item.calories} kcal • {item.protein}g protein</div>
                                   </div>
                               </div>
                               <Button size="sm" variant="ghost" icon={Plus} onClick={() => addMeal(item)} className="text-emerald-600 hover:bg-emerald-100">Add</Button>
                          </div>
                      ))}
                  </div>
              )}
          </div>
      </Card>

      {/* TODAY'S MEALS LIST */}
      <Card variant="glass" className="p-8 bg-white border-slate-200 animate-fade-in-up delay-400">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-lg shadow-sm border border-slate-200">📅</span> 
            Today's Log
        </h3>

        {todayMeals.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-sm border border-slate-100">🍽️</div>
                <p className="text-slate-500 font-medium">No meals logged yet today.</p>
                <p className="text-xs text-slate-400 mt-1">Search above to get started!</p>
            </div>
        ) : (
          <div className="space-y-4">
            {todayMeals.map((meal) => (
              <div key={meal.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md transition-all group">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm border border-slate-200 group-hover:scale-110 transition-transform">
                        {/* Simple icon logic based on index or random for now if type missing */}
                        <Utensils size={20} className="text-slate-500" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-lg">{meal.name}</h4>
                        <div className="flex items-center gap-3 text-sm text-slate-500">
                            <span className="font-bold text-slate-600">{meal.calories} kcal</span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            <span>{meal.protein}g protein</span>
                            {meal.time && (
                                <>
                                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                    <span>{meal.time}</span>
                                </>
                            )}
                        </div>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-2">
                    <button 
                        onClick={() => removeMeal(meal.id)}
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                        title="Remove Meal"
                    >
                        <Trash2 size={18} />
                    </button>
                 </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

/* ================= SMALL COMPONENT ================= */
function ProgressCard({
  title,
  current,
  target,
  percent,
  met,
  color,
  barColor,
  bgColor,
  borderColor,
  unit = "",
  icon: Icon
}) {
  return (
    <Card variant="glass" className={`p-6 border ${borderColor} ${bgColor} relative overflow-hidden group`}>
      <div className="absolute right-0 top-0 w-32 h-32 bg-white/40 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 transition-colors pointer-events-none" />
      
      <div className="flex justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-white/60 ${color} shadow-sm`}>
                <Icon size={20} />
            </div>
            <div>
                <h3 className="font-bold text-slate-800">{title}</h3>
                <p className="text-xs text-slate-500">Daily Goal</p>
            </div>
        </div>
        {met && <CheckCircle className="text-emerald-500 w-6 h-6" />}
      </div>

      <div className="space-y-1 relative z-10">
        <div className="flex justify-between items-end">
            <span className={`text-2xl font-black ${color}`}>{current}</span>
            <span className="text-sm text-slate-500 mb-1 font-medium">/ {target}{unit}</span>
        </div>
        
        <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
            <div
            className={`h-full rounded-full ${barColor} shadow-sm transition-all duration-1000 ease-out`}
            style={{ width: `${percent}%` }}
            />
        </div>
      </div>
    </Card>
  );
}
