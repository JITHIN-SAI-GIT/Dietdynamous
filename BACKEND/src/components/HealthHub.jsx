import { useState } from "react";
import { 
  Activity, Heart, Droplets, Moon, Zap, 
  Bell, Watch, ChevronRight, AlertCircle, CheckCircle 
} from "lucide-react";
import Card from "./ui/Card";
import Button from "./ui/Button";

export default function HealthHub() {
  const [reminders, setReminders] = useState({
    meal: true,
    water: true,
    workout: false,
    sleep: true
  });

  const toggleReminder = (key) => {
    setReminders(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const insights = [
    { type: "warning", message: "Protein intake is low today. Try adding a shake!", icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-50 border-amber-100" },
    { type: "success", message: "Great job hitting your step goal yesterday.", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-50 border-emerald-100" }
  ];

  return (
    <div className="space-y-8 pb-12 animate-fade-in text-slate-800">
       
       {/* HEADER */}
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 animate-fade-in-up delay-100">
           <div>
               <h1 className="text-3xl font-black tracking-tight text-slate-900 border-l-4 border-emerald-500 pl-4">Health Hub</h1>
               <p className="text-slate-500 mt-2 pl-4">Your central command for health & wellness.</p>
           </div>
           
           {/* Date Display */}
           <div className="bg-white px-5 py-2 rounded-full border border-slate-200 shadow-sm font-bold text-slate-600 text-sm hover:scale-105 transition-transform duration-300 cursor-default">
               {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
           </div>
       </div>

       {/* SECTION 1: DAILY HEALTH SUMMARY */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up delay-200">
           <SummaryCard 
                title="Calories" value="1,240" target="2,500" unit="kcal" 
                icon={Zap} color="text-orange-500" bg="bg-orange-50" 
                progress={50} gradient="from-orange-400 to-red-500"
            />
           <SummaryCard 
                title="Steps" value="8,432" target="10,000" unit="steps" 
                icon={Activity} color="text-emerald-500" bg="bg-emerald-50" 
                progress={84} gradient="from-emerald-400 to-teal-500"
            />
           <SummaryCard 
                title="Hydration" value="1,250" target="2,500" unit="ml" 
                icon={Droplets} color="text-blue-500" bg="bg-blue-50" 
                progress={50} gradient="from-blue-400 to-cyan-500"
            />
           <SummaryCard 
                title="Sleep" value="7h 12m" target="8h" unit="" 
                icon={Moon} color="text-indigo-500" bg="bg-indigo-50" 
                progress={90} gradient="from-indigo-400 to-purple-500"
            />
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* SECTION 2: SMART REMINDERS CENTER */}
           <Card variant="glass" className="lg:col-span-2 bg-white border-slate-200 p-6">
               <div className="flex items-center gap-3 mb-6">
                   <div className="p-3 bg-violet-50 text-violet-600 rounded-xl border border-violet-100">
                       <Bell className="w-6 h-6" />
                   </div>
                   <div>
                       <h3 className="text-xl font-bold text-slate-800">Smart Reminders</h3>
                       <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Manage Alerts</p>
                   </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <ReminderToggle 
                        label="Meal Reminders" 
                        time="12:30 PM" 
                        isActive={reminders.meal} 
                        onToggle={() => toggleReminder('meal')} 
                    />
                   <ReminderToggle 
                        label="Hydration Alerts" 
                        time="Every 2h" 
                        isActive={reminders.water} 
                        onToggle={() => toggleReminder('water')} 
                    />
                   <ReminderToggle 
                        label="Workout Time" 
                        time="05:00 PM" 
                        isActive={reminders.workout} 
                        onToggle={() => toggleReminder('workout')} 
                    />
                   <ReminderToggle 
                        label="Wind Down" 
                        time="10:00 PM" 
                        isActive={reminders.sleep} 
                        onToggle={() => toggleReminder('sleep')} 
                    />
               </div>
           </Card>

           {/* SECTION 3: INSIGHTS & WEARABLE STATUS */}
           <div className="space-y-6">
               {/* Insight Card */}
               <Card variant="glass" className="bg-white border-slate-200 p-6 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-5">
                       <Zap className="w-24 h-24" />
                   </div>
                   <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                       AI Health Insights
                   </h3>
                   <div className="space-y-3 relative z-10">
                       {insights.map((item, idx) => (
                           <div key={idx} className={`p-3 rounded-xl border flex gap-3 items-start ${item.bg}`}>
                               <item.icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${item.color}`} />
                               <p className="text-sm font-medium text-slate-700 leading-snug">{item.message}</p>
                           </div>
                       ))}
                   </div>
               </Card>


           </div>
       </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function SummaryCard({ title, value, target, unit, icon: Icon, color, bg, progress, gradient }) {
    return (
        <Card variant="glass" className="p-5 flex flex-col justify-between h-32 group hover:shadow-lg transition-all bg-white border-slate-200">
            <div className="flex justify-between items-start">
                <div className={`p-2 rounded-lg ${bg} ${color}`}>
                    <Icon className="w-5 h-5" />
                </div>
                {/* Mini Ring (Visual Only) */}
                <div className="w-8 h-8 relative">
                    <svg className="w-full h-full -rotate-90">
                        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-slate-100" />
                        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="3" fill="transparent" strokeDasharray="88" strokeDashoffset={88 - (88 * (progress/100))} className={`${color.replace('text-', 'text-')}`} strokeLinecap="round" />
                    </svg>
                </div>
            </div>
            <div>
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-800">{value}</span>
                    <span className="text-xs font-semibold text-slate-400">{unit}</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className={`h-full rounded-full bg-gradient-to-r ${gradient}`} style={{ width: `${progress}%` }}></div>
                </div>
            </div>
        </Card>
    )
}

function ReminderToggle({ label, time, isActive, onToggle }) {
    return (
        <div className={`flex items-center justify-between p-4 rounded-xl border transition-all ${isActive ? 'bg-white border-emerald-200 shadow-sm' : 'bg-slate-50 border-slate-100 opacity-60'}`}>
            <div>
                <h4 className="font-bold text-slate-700 text-sm">{label}</h4>
                <p className="text-xs text-slate-400 font-medium mt-1">Status: <span className={isActive ? "text-emerald-500" : "text-slate-400"}>{isActive ? 'Sent to Watch' : 'Off'}</span></p>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">{time}</span>
                <button 
                    onClick={onToggle}
                    className={`w-10 h-6 rounded-full relative transition-colors duration-300 focus:outline-none ${isActive ? 'bg-emerald-500' : 'bg-slate-300'}`}
                >
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${isActive ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
            </div>
        </div>
    )
}
