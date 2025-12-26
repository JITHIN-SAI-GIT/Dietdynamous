import { useState, useRef, useEffect } from "react";
import { 
  Camera, Utensils, BookOpen, ChevronRight, CheckCircle2, 
  X, Info, ScanLine, Smartphone, Zap, Flame, User, Download,
  ArrowRight, Timer, Play, Pause, RotateCcw, ShoppingBag, ChefHat, 
  Printer, Share2, ClipboardList
} from "lucide-react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Badge from "./ui/Badge";

// --- DATA: GROCERY / ENCYCLOPEDIA ---
const FOOD_ENCYCLOPEDIA = [
  {
    category: "Vegetables",
    icon: "🥦",
    items: [
      { name: "Spinach", calories: 23, benefits: "Iron, Vitamin K", bestTime: "Lunch/Dinner", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=300&q=80" },
      { name: "Broccoli", calories: 34, benefits: "Fiber, Vitamin C", bestTime: "Dinner", image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=300&q=80" },
      { name: "Sweet Potato", calories: 86, benefits: "Complex Carbs", bestTime: "Pre-Workout", image: "https://images.unsplash.com/photo-1606914469725-e3966047a74f?auto=format&fit=crop&w=300&q=80" },
    ]
  },
  {
    category: "Fruits",
    icon: "🍎",
    items: [
      { name: "Apple", calories: 52, benefits: "Fiber, Antioxidants", bestTime: "Morning/Snack", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=300&q=80" },
      { name: "Banana", calories: 89, benefits: "Potassium, Energy", bestTime: "Pre-Workout", image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=300&q=80" },
      { name: "Blueberries", calories: 57, benefits: "Brain Boost", bestTime: "Breakfast", image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=300&q=80" },
    ]
  },
  {
      category: "Protein",
      icon: "🍗",
      items: [
          { name: "Chicken Breast", calories: 165, benefits: "Lean Protein", bestTime: "Post-Workout", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=300&q=80" },
          { name: "Salmon", calories: 208, benefits: "Omega-3", bestTime: "Dinner", image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=300&q=80" },
          { name: "Lentils", calories: 116, benefits: "Plant Protein", bestTime: "Lunch", image: "https://images.unsplash.com/photo-1534938665420-4193effeacc4?auto=format&fit=crop&w=300&q=80" },
      ]
  }
];

// --- MOCK MEAL PLANS ---
const MEAL_PLANS = {
    "weight_loss": {
        title: "Fat Shred & Tone",
        calories: 1800,
        protein: 160,
        description: "High protein, moderate fat, low carb deficit to strip body fat.",
        meals: [
            { 
                time: "Morning", 
                title: "Oatmeal & Whites", 
                foods: ["Oats (50g)", "Egg Whites (6)", "Berries"], 
                image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=800&q=80", 
                prep: "Boil oats, scramble whites.",
                steps: [
                    "Bring 1 cup of water to boil.",
                    "Add 50g oats and reduce heat to simmer for 5 mins.",
                    "Separately, whisk 6 egg whites and scramble in a non-stick pan.",
                    "Top oats with fresh berries and serve."
                ],
                cookTime: 10
            },
            { 
                time: "Afternoon", 
                title: "Grilled Chicken Salad", 
                foods: ["Chicken Breast (200g)", "Mixed Greens", "Olive Oil"], 
                image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80", 
                prep: "Grill chicken 6m/side, toss salad.",
                steps: [
                    "Season chicken breast with salt, pepper, and herbs.",
                    "Preheat grill or pan to medium-high heat.",
                    "Cook chicken for 6-7 mins per side until fully cooked.",
                    "Let chicken rest for 5 mins, then slice.",
                    "Toss greens with 1 tsp olive oil and top with chicken."
                ],
                cookTime: 20
            },
            { 
                time: "Night", 
                title: "Salmon & Asparagus", 
                foods: ["Salmon (150g)", "Asparagus (10)", "Lemon"], 
                image: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=800&q=80", 
                prep: "Bake salmon at 400°F for 12m.",
                steps: [
                    "Preheat oven to 400°F (200°C).",
                    "Place salmon and asparagus on a baking sheet.",
                    "Drizzle with lemon juice and season lightly.",
                    "Bake for 12-15 minutes until salmon flakes effectively."
                ],
                cookTime: 15
            }
        ]
    },
    "muscle_gain": {
        title: "Hypertrophy Bulk",
        calories: 3000,
        protein: 220,
        description: "Calorie surplus with heavy carbs to fuel intense lifting sessions.",
        meals: [
            { 
                time: "Morning", 
                title: "Whole Eggs & Toast", 
                foods: ["Whole Eggs (4)", "Whole Wheat Toast (2)", "Avocado"], 
                image: "https://images.unsplash.com/photo-1525351440155-ad29fd1f478d?w=800&q=80", 
                prep: "Fry eggs, mash avocado on toast.",
                steps: [
                    "Toast 2 slices of whole wheat bread.",
                    "Mash half an avocado and spread on toast.",
                    "Fry 4 whole eggs in a pan with minimal oil.",
                    "Season with salt and pepper and serve."
                ],
                cookTime: 10
            },
            { 
                time: "Afternoon", 
                title: "Steak & Rice Bowl", 
                foods: ["Sirloin Steak (200g)", "White Rice (1.5 cups)", "Peppers"], 
                image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80", 
                prep: "Sear steak, steam rice.",
                steps: [
                    "Cook 1.5 cups of white rice.",
                    "Season sirloin steak generously.",
                    "Sear steak in a hot skillet for 4 mins per side for medium-rare.",
                    "Sauté sliced peppers in the same pan.",
                    "Slice steak against the grain and serve over rice."
                ],
                cookTime: 25
            },
            { 
                time: "Night", 
                title: "Pasta & Lean Beef", 
                foods: ["Lean Ground Beef (200g)", "Pasta (100g)", "Marinara"], 
                image: "https://images.unsplash.com/photo-1608835291093-394b0c943a75?w=800&q=80", 
                prep: "Brown beef, boil pasta, mix.",
                steps: [
                    "Boil water and cook 100g pasta al dente.",
                    "In a pan, brown 200g lean ground beef.",
                    "Add marinara sauce to beef and simmer for 5 mins.",
                    "Toss pasta with sauce and serve."
                ],
                cookTime: 20
            }
        ]
    }
};

// --- SUB-COMPONENT: CHEF MODE OVERLAY ---
function ChefMode({ meal, onClose }) {
    const [step, setStep] = useState(0);
    const [timeLeft, setTimeLeft] = useState(meal.cookTime * 60);
    const [timerActive, setTimerActive] = useState(false);

    useEffect(() => {
        let interval;
        if (timerActive && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
        } else if (timeLeft === 0) {
            setTimerActive(false);
            // Could add sound logic here
        }
        return () => clearInterval(interval);
    }, [timerActive, timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="fixed inset-0 bg-slate-900/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[80vh]">
                {/* Visual Side */}
                <div className="md:w-1/2 relative bg-black">
                    <img src={meal.image} className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
                        <Button 
                           variant="secondary" 
                           onClick={onClose} 
                           className="self-start rounded-full w-10 h-10 p-0 flex items-center justify-center bg-white/20 hover:bg-white/40 border-none text-white backdrop-blur-md"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                        
                        <div>
                            <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold uppercase tracking-widest text-sm">
                                <ChefHat className="w-5 h-5" /> Chef Mode
                            </div>
                            <h2 className="text-4xl font-black leading-tight mb-4">{meal.title}</h2>
                            
                            {/* Timer Widget */}
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 inline-flex flex-col items-center min-w-[150px]">
                                <span className="text-xs text-slate-300 font-bold uppercase mb-1">Cooking Timer</span>
                                <div className="text-4xl font-mono font-bold mb-2">{formatTime(timeLeft)}</div>
                                <div className="flex gap-2">
                                    <button onClick={() => setTimerActive(!timerActive)} className="p-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white transition-colors">
                                        {timerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                    </button>
                                    <button onClick={() => { setTimeLeft(meal.cookTime * 60); setTimerActive(false); }} className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors">
                                        <RotateCcw className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Steps Side */}
                <div className="md:w-1/2 p-8 flex flex-col bg-white">
                    <div className="flex-1 overflow-y-auto">
                        <div className="space-y-8">
                             {meal.steps.map((s, i) => (
                                 <div 
                                    key={i} 
                                    className={`transition-all duration-500 flex gap-4 ${
                                        i === step 
                                        ? "opacity-100 scale-100" 
                                        : i < step ? "opacity-40" : "opacity-20"
                                    }`}
                                    onClick={() => setStep(i)}
                                 >
                                     <div className={`
                                         flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-2
                                         ${i === step ? "bg-emerald-500 text-white border-emerald-500" : i < step ? "bg-emerald-100 text-emerald-600 border-emerald-200" : "bg-white text-slate-300 border-slate-200"}
                                     `}>
                                         {i + 1}
                                     </div>
                                     <p className={`text-lg font-medium pt-2 ${i === step ? "text-slate-800" : "text-slate-400"}`}>
                                         {s}
                                     </p>
                                 </div>
                             ))}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex justify-between">
                        <Button 
                            variant="outline" 
                            disabled={step === 0}
                            onClick={() => setStep(s => s - 1)}
                        >
                            Previous
                        </Button>
                        <Button 
                            disabled={step === meal.steps.length - 1}
                            onClick={() => setStep(s => s + 1)}
                            icon={ArrowRight}
                            className="bg-slate-900 text-white"
                        >
                            Next Step
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- SUB-COMPONENT: SHOPPING LIST MODAL ---
function ShoppingListModal({ plan, onClose }) {
    // Flatten all foods
    const allIngredients = plan.meals.flatMap(m => m.foods);
    // Remove duplicates (simple string match)
    const uniqueIngredients = [...new Set(allIngredients)];

    return (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
             <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-scale-up">
                 <div className="bg-emerald-500 p-6 text-white flex justify-between items-start">
                     <div>
                         <h2 className="text-2xl font-black flex items-center gap-2">
                             <ShoppingBag className="w-6 h-6" /> Shopping List
                         </h2>
                         <p className="text-emerald-100 opacity-90 text-sm mt-1">Based on "Fat Shred & Tone"</p>
                     </div>
                     <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                         <X className="w-6 h-6" />
                     </button>
                 </div>
                 
                 <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
                     {uniqueIngredients.map((item, i) => (
                         <label key={i} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer group">
                             <input type="checkbox" className="w-5 h-5 rounded-md border-slate-300 text-emerald-500 focus:ring-emerald-500" />
                             <span className="text-slate-700 font-medium group-hover:text-slate-900">{item}</span>
                         </label>
                     ))}
                 </div>

                 <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-3">
                     <Button variant="outline" className="flex-1" icon={Share2}>Share</Button>
                     <Button className="flex-1 bg-slate-900 text-white" icon={Download}>Save PDF</Button>
                 </div>
             </div>
        </div>
    );
}


// --- SUB-COMPONENT: MEAL CARD (Updated) ---
function MealCard({ meal, index, onStartCooking }) {
    const [showPrep, setShowPrep] = useState(false);

    return (
        <div 
            className="flex flex-col md:flex-row gap-6 bg-white p-4 rounded-[2rem] shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all hover:-translate-y-1 mb-6 border border-slate-100 group relative overflow-hidden"
            style={{ animationDelay: `${index * 150}ms` }}
        >
            {/* Image Side */}
            <div className="md:w-1/3 relative overflow-hidden rounded-2xl aspect-video md:aspect-[4/3] group-hover:shadow-lg transition-shadow">
                <img src={meal.image} alt={meal.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <span className="text-white font-bold text-lg">{meal.time}</span>
                </div>
                 {/* Cook Action */}
                 <button 
                    onClick={() => onStartCooking(meal)}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md border border-white/50 text-white rounded-full w-16 h-16 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-50 group-hover:scale-100 hover:bg-emerald-500 hover:border-emerald-500"
                >
                    <ChefHat className="w-8 h-8" />
                </button>
            </div>

            {/* Content Side */}
            <div className="flex-1 space-y-4 relative z-10">
                <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-black text-slate-800">{meal.title}</h3>
                    <button 
                        onClick={() => setShowPrep(!showPrep)}
                        className="p-2 rounded-full bg-slate-100 hover:bg-emerald-100 text-slate-400 hover:text-emerald-600 transition-colors"
                        title="Preparation Steps"
                    >
                        <Info className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex flex-wrap gap-2">
                    {meal.foods.map((f, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 font-medium">{f}</span>
                    ))}
                </div>
                
                <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><Timer className="w-4 h-4" /> {meal.cookTime} min prep</span>
                    <span className="flex items-center gap-1"><Flame className="w-4 h-4 text-orange-500" /> High Protein</span>
                </div>

                {/* Animated Prep Section */}
                <div className={`
                    overflow-hidden transition-all duration-500 ease-in-out bg-emerald-50 rounded-xl
                    ${showPrep ? "max-h-40 opacity-100 p-4 border border-emerald-200" : "max-h-0 opacity-0 border-0"}
                `}>
                     <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-2">
                         <ChefHat className="w-4 h-4" /> Quick Prep Summary
                     </h4>
                     <p className="text-emerald-700 text-sm animate-pulse">{meal.prep}</p>
                </div>
            </div>
        </div>
    );
}

// --- SUB-COMPONENT: AI SCANNER ---
function AIScanner() {
    const [scanning, setScanning] = useState(false);
    const [result, setResult] = useState(null);
    const videoRef = useRef(null);

    const startScan = () => {
        setScanning(true);
        // Simulate scanning delay
        setTimeout(() => {
            setScanning(false);
            setResult({
                food: "Grilled Salmon Bowl",
                calories: 450,
                protein: "35g",
                fat: "18g",
                verdict: "Excellent Choice",
                advice: "Great source of Omega-3. Perfect for post-workout recovery.",
                color: "text-emerald-500",
                bg: "bg-emerald-50"
            });
        }, 2000);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
                <Badge variant="warning" className="mx-auto">BETA FEATURE</Badge>
                <h2 className="text-3xl font-black text-slate-900">AI Food Analyst</h2>
                <p className="text-slate-500">Snap a picture to get instant nutritional breakdown and advice.</p>
            </div>
            
            <div className="relative aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-900 group">
                 {!scanning && !result && (
                     <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 space-y-4">
                         <Camera className="w-16 h-16 opacity-50" />
                         <p>Camera inactive</p>
                     </div>
                 )}
                 
                 {/* Simulated Camera Feed */}
                 {scanning && (
                    <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center">
                        <div className="w-full h-1 bg-emerald-500 absolute top-1/2 shadow-[0_0_20px_#10b981] animate-scan-y"></div>
                        <p className="text-emerald-400 font-mono tracking-widest mt-20">ANALYZING...</p>
                    </div>
                 )}

                 {/* Result Overlay */}
                 {result && (
                     <div className="absolute inset-0 bg-white z-20 p-8 flex flex-col items-center justify-center text-center animate-fade-in">
                         <div className={`p-4 rounded-full ${result.bg} mb-4`}>
                             <CheckCircle2 className={`w-12 h-12 ${result.color}`} />
                         </div>
                         <h3 className="text-3xl font-black text-slate-800 mb-1">{result.food}</h3>
                         <div className="flex gap-4 text-slate-500 mb-6 font-mono text-sm">
                             <span>{result.calories} kcal</span>
                             <span>•</span>
                             <span>{result.protein} Protein</span>
                         </div>
                         <div className={`px-6 py-4 rounded-2xl ${result.bg} border-l-4 ${result.color.replace('text', 'border')} max-w-sm`}>
                             <p className={`font-bold ${result.color} mb-1`}>{result.verdict}</p>
                             <p className="text-slate-600 text-sm">{result.advice}</p>
                         </div>
                         <Button variant="ghost" className="mt-6" onClick={() => setResult(null)}>Scan Another</Button>
                     </div>
                 )}
            </div>

            <Button 
                onClick={startScan} 
                disabled={scanning}
                className="w-full h-16 text-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-xl shadow-indigo-500/30"
                icon={ScanLine}
            >
                {scanning ? "Scanning..." : "Capture & Analyze"}
            </Button>
        </div>
    );
}

// --- SUB-COMPONENT: FOOD ENCYCLOPEDIA ---
function FoodLibrary() {
    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                 <h2 className="text-3xl font-black text-slate-900">Food Encyclopedia</h2>
                 <p className="text-slate-500">Know what you eat. 3D insights into everyday ingredients.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {FOOD_ENCYCLOPEDIA.map((cat) => (
                    <div key={cat.category} className="space-y-4">
                        <h3 className="font-bold text-slate-700 flex items-center gap-2 text-xl">
                            <span>{cat.icon}</span> {cat.category}
                        </h3>
                        <div className="space-y-4">
                            {cat.items.map((item, i) => (
                                <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all flex gap-4 group">
                                    <img src={item.image} className="w-20 h-20 rounded-xl object-cover shadow-md group-hover:rotate-3 transition-transform" />
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-lg group-hover:text-emerald-600 transition-colors">{item.name}</h4>
                                        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
                                            <Flame className="w-3 h-3" /> {item.calories} cal
                                        </div>
                                        <p className="text-xs text-slate-500 mb-1">
                                            <span className="font-bold text-emerald-600">Benefits:</span> {item.benefits}
                                        </p>
                                        <div className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded text-[10px] uppercase font-bold inline-block">
                                            Best: {item.bestTime}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function DietPlan() {
    const [activeTab, setActiveTab] = useState("plan");
    const [goalType, setGoalType] = useState("weight_loss"); // "weight_loss" | "muscle_gain"
    
    // Feature States
    const [shoppingListOpen, setShoppingListOpen] = useState(false);
    const [activeChefMeal, setActiveChefMeal] = useState(null);

    const selectedPlan = MEAL_PLANS[goalType];

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">
            {/* TOP NAVIGATION TABS */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-2 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex p-1 bg-slate-100 rounded-2xl w-full md:w-auto">
                    {[
                        { id: "plan", label: "My Plan", icon: Utensils },
                        { id: "scanner", label: "AI Scanner", icon: Camera },
                        { id: "library", label: "Encyclopedia", icon: BookOpen },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                                activeTab === tab.id 
                                ? "bg-white text-emerald-600 shadow-md" 
                                : "text-slate-500 hover:text-slate-700"
                            }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {activeTab === "plan" && (
                    <div className="flex items-center gap-3 pr-2">
                        <span className="text-sm font-bold text-slate-400 hidden md:block">Goal:</span>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setGoalType("weight_loss")}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                                    goalType === "weight_loss" 
                                    ? "bg-rose-50 border-rose-200 text-rose-600" 
                                    : "border-transparent text-slate-400 hover:bg-slate-50"
                                }`}
                            >
                                Weight Loss
                            </button>
                            <button 
                                onClick={() => setGoalType("muscle_gain")}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                                    goalType === "muscle_gain" 
                                    ? "bg-blue-50 border-blue-200 text-blue-600" 
                                    : "border-transparent text-slate-400 hover:bg-slate-50"
                                }`}
                            >
                                Muscle Gain
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* TAB CONTENT */}
            <div className="min-h-[600px]">
                {activeTab === "plan" && (
                    <div className="space-y-8 animate-slide-up">
                         {/* Plan Summary */}
                         <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
                             <div className="relative z-10 max-w-2xl">
                                 <Badge className="mb-4 bg-white/10 text-white border-white/20">Active Plan</Badge>
                                 <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">{selectedPlan.title}</h1>
                                 <p className="text-slate-300 text-lg mb-8">{selectedPlan.description}</p>
                                 <div className="flex gap-8 items-center">
                                     <div>
                                         <div className="text-3xl font-black text-emerald-400">{selectedPlan.calories}</div>
                                         <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Calories</div>
                                     </div>
                                     <div className="h-10 w-px bg-white/10"></div>
                                     <div>
                                         <div className="text-3xl font-black text-blue-400">{selectedPlan.protein}g</div>
                                         <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Protein</div>
                                     </div>
                                     
                                     {/* Shopping List Trigger */}
                                     <div className="ml-auto">
                                         <Button 
                                            onClick={() => setShoppingListOpen(true)}
                                            className="bg-white text-slate-900 border-none shadow-xl hover:bg-slate-100" 
                                            icon={ClipboardList}
                                         >
                                             Grocery List
                                         </Button>
                                     </div>
                                 </div>
                             </div>
                             {/* Abstract Shapes */}
                             <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
                             <div className="absolute left-0 bottom-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>
                         </div>

                         {/* Meal Cards */}
                         <div>
                             {selectedPlan.meals.map((meal, idx) => (
                                 <MealCard 
                                    key={idx} 
                                    meal={meal} 
                                    index={idx} 
                                    onStartCooking={(m) => setActiveChefMeal(m)}
                                 />
                             ))}
                         </div>
                    </div>
                )}

                {activeTab === "scanner" && (
                    <div className="animate-slide-up pt-10">
                        <AIScanner />
                    </div>
                )}

                {activeTab === "library" && (
                    <div className="animate-slide-up">
                        <FoodLibrary />
                    </div>
                )}
            </div>

            {/* MODALS */}
            {shoppingListOpen && <ShoppingListModal plan={selectedPlan} onClose={() => setShoppingListOpen(false)} />}
            {activeChefMeal && <ChefMode meal={activeChefMeal} onClose={() => setActiveChefMeal(null)} />}
        </div>
    );
}
