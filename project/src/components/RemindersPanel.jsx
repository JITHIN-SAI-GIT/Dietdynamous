import { useState, useEffect } from "react";
import { Bell, Clock, Check, X, Smartphone } from "lucide-react";
import Card from "./ui/Card";
import api from "../services/api";

export default function RemindersPanel() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [synced, setSynced] = useState(false);

  // Fetch initial reminders
  useEffect(() => {
      const fetchReminders = async () => {
          try {
              const res = await api.get("/reminders");
              if (res.data) setReminders(res.data);
          } catch (e) {
              console.error("Failed to load reminders", e);
              // Fallback default
              setReminders([
                { id: 1, type: "Water", label: "Hydration Check", time: "Every 2 hrs", active: true },
                { id: 2, type: "Meal", label: "Lunch Reminder", time: "13:00", active: true },
                { id: 3, type: "Workout", label: "Evening Run", time: "18:00", active: false },
                { id: 4, type: "Sleep", label: "Wind Down", time: "22:30", active: true },
              ]);
          } finally {
              setLoading(false);
          }
      };
      fetchReminders();
  }, []);

  const toggleReminder = (id) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, active: !r.active } : r));
    setHasChanges(true);
    setSynced(false);
  };

  const handleSync = async () => {
    setIsSyncing(true);
    try {
        await api.post("/reminders", { reminders });
        
        // Success
        setHasChanges(false);
        setSynced(true);
        setTimeout(() => setSynced(false), 3000);
    } catch (e) {
        console.error("Sync failed", e);
    } finally {
        setIsSyncing(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-400">Loading Reminders...</div>;

  return (
    <Card variant="glass" className="bg-white border-slate-200 p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
         <div className="flex items-center gap-3">
             <div className="p-3 bg-indigo-50 text-indigo-500 rounded-xl border border-indigo-100">
                 <Bell className="w-6 h-6" />
             </div>
             <div>
                 <h3 className="text-xl font-bold text-slate-800">Smart Reminders</h3>
                 <p className="text-sm text-slate-500 flex items-center gap-1">
                    <Smartphone className="w-3 h-3" />
                    Syncs to Mobile App
                 </p>
             </div>
         </div>
         {hasChanges ? (
             <button 
                onClick={handleSync}
                disabled={isSyncing}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
             >
                {isSyncing ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Syncing...
                    </>
                ) : "Push to Watch"}
             </button>
         ) : synced ? (
             <div className="px-4 py-2 bg-emerald-50 text-emerald-600 border border-emerald-200 text-sm font-bold rounded-xl flex items-center gap-2 animate-fade-in">
                 <Check className="w-4 h-4" /> Sent to App
             </div>
         ) : null}
      </div>

      <div className="space-y-4">
          {reminders.map((reminder) => (
              <div 
                key={reminder.id} 
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${reminder.active ? 'bg-indigo-50/50 border-indigo-100' : 'bg-slate-50 border-slate-100 opacity-75'}`}
              >
                  <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs uppercase
                          ${reminder.active ? 'bg-white text-indigo-600 shadow-sm' : 'bg-slate-200 text-slate-500'}
                      `}>
                          {reminder.type.slice(0,3)}
                      </div>
                      <div>
                          <h4 className={`font-bold ${reminder.active ? 'text-slate-800' : 'text-slate-500'}`}>{reminder.label}</h4>
                          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                              <Clock className="w-3 h-3" />
                              {reminder.time}
                          </div>
                      </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={reminder.active}
                        onChange={() => toggleReminder(reminder.id)}
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 shadow-inner"></div>
                  </label>
              </div>
          ))}
      </div>
      
      <p className="text-center text-xs text-slate-400 mt-6">
          Reminders are delivered via the Diet Dynamos mobile app push notifications.
      </p>
    </Card>
  );
}
